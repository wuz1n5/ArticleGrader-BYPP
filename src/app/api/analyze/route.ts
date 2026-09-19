import type { NextRequest } from "next/server";
import { getScienceDailyArticles } from "@/lib/rss/getScienceDailyArticles";
import {
  claimArticle,
  completeArticle,
  updateArticleSubfields,
} from "@/lib/db/articleAnalysisRepository";
import { analyzeArticle } from "@/lib/ai/analyzeArticle";
import { generateSubfields } from "@/lib/ai/generateSubfields";
import { limitAnalysisConcurrency } from "@/lib/ai/concurrencyLimit";
import { getCategoryName } from "@/lib/categories";
import { getAllowedSubfields } from "@/lib/subfields";
import type { Article } from "@/types/article";

// 300 is Vercel Hobby's actual default/max function duration under Fluid
// Compute (enabled by default for projects created after 2025-04-23). If
// this project has Fluid Compute disabled, lower this and BATCH_SIZE below
// to match the project's actual duration limit.
export const maxDuration = 300;

const SOURCE = "sciencedaily";

// A single invocation only ever claims up to this many articles — bounds one
// run to BATCH_SIZE / MAX_CONCURRENT_AI_CALLS rounds at the per-call
// timeout, which safely fits inside maxDuration even in the worst case.
// Every article currently in the feed is still eventually in scope: articles
// beyond this batch aren't touched at all this run (no claim attempt), so
// they're immediately claimable — not stuck behind the 1-hour stale-reclaim
// window — by the next cron run or a manual re-trigger. This is a
// serverless execution-unit limit, not a product-visible article limit: the
// homepage/detail pages just read whatever is 'complete' in the DB and have
// no notion of batches.
const BATCH_SIZE = 15;

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

  // Walk the feed in order, attempting claims one at a time and stopping the
  // moment BATCH_SIZE succeed. Already-complete articles simply fail the
  // claim (claimArticle is a no-op in that case) and are skipped for free,
  // so each day's run naturally picks up wherever the previous run left off
  // — no separate cursor/offset state needed.
  const claimed: Article[] = [];
  let attempted = 0;
  for (const article of articles) {
    if (claimed.length >= BATCH_SIZE) break;
    attempted++;
    if (await claimArticle(article.id, SOURCE, article.categories)) {
      claimed.push(article);
    }
  }

  const outcomes = await Promise.allSettled(
    claimed.map((article) =>
      limitAnalysisConcurrency(async () => {
        const analysis = await analyzeArticle({
          title: article.title,
          summary: article.summary,
          category: article.categories.map(getCategoryName).join(", "),
        });
        await completeArticle(article.id, analysis);

        // Best-effort, independent of difficulty/learning_path: a subfields
        // failure must never undo or block the difficulty completion above.
        try {
          const subfields = await generateSubfields({
            title: article.title,
            summary: article.summary,
            category: article.categories.map(getCategoryName).join(", "),
            allowedSubfields: getAllowedSubfields(article.categories),
          });
          await updateArticleSubfields(article.id, subfields);
        } catch (err) {
          console.error("[cron] subfields generation failed:", article.id, err);
        }

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
    attempted,
    claimed: claimed.length,
    succeeded,
    failed: failed.length,
  });
}
