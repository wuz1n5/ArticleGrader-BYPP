import type { NextRequest } from "next/server";
import { getScienceDailyArticles } from "@/lib/rss/getScienceDailyArticles";
import { claimArticle, completeArticle } from "@/lib/db/articleAnalysisRepository";
import { analyzeArticle } from "@/lib/ai/analyzeArticle";
import { limitAnalysisConcurrency } from "@/lib/ai/concurrencyLimit";
import { getCategoryName } from "@/lib/categories";

export const maxDuration = 60;

const SOURCE = "sciencedaily";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const feed = await getScienceDailyArticles();
  if (!feed.ok) {
    console.error("[cron] ScienceDaily feed unavailable:", feed.reason);
    return Response.json({ ok: false, reason: feed.reason }, { status: 200 });
  }

  const articles = feed.articles;

  // Claim first (cheap DB writes, safe to do for the whole feed at once) —
  // every article currently in the feed is in scope, never an arbitrary
  // subset. Only articles this call actually wins the claim for proceed to
  // an OpenAI call; everything else is already complete or claimed by
  // another run/duplicate delivery.
  const claimResults = await Promise.all(
    articles.map(async (article) => ({
      article,
      claimed: await claimArticle(article.id, SOURCE, article.category),
    }))
  );
  const toAnalyze = claimResults.filter((c) => c.claimed).map((c) => c.article);

  const outcomes = await Promise.allSettled(
    toAnalyze.map((article) =>
      limitAnalysisConcurrency(async () => {
        const analysis = await analyzeArticle({
          title: article.title,
          summary: article.summary,
          category: getCategoryName(article.category),
        });
        await completeArticle(article.id, analysis);
        return article.id;
      })
    )
  );

  const succeeded = outcomes.filter((o) => o.status === "fulfilled").length;
  const failed = outcomes.filter((o) => o.status === "rejected");
  for (const f of failed) {
    if (f.status === "rejected") {
      console.error("[cron] analysis failed:", f.reason);
    }
  }

  return Response.json({
    ok: true,
    totalInFeed: articles.length,
    claimed: toAnalyze.length,
    succeeded,
    failed: failed.length,
  });
}
