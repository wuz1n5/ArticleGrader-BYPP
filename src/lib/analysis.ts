import { getCompletedAnalyses } from "@/lib/db/articleAnalysisRepository";
import type { Article } from "@/types/article";
import type { ArticleAnalysis } from "@/types/analysis";

// Pure DB read — no OpenAI call in this path. Analysis is produced entirely
// by the cron job (src/app/api/analyze/route.ts); this just looks up
// whatever's already there. Returns null (existing "Not yet analyzed" UI)
// if the article hasn't been analyzed yet.
export async function getArticleAnalysis(article: Article): Promise<ArticleAnalysis | null> {
  const results = await getCompletedAnalyses([article.id]);
  return results.get(article.id) ?? null;
}
