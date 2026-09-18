import { ARTICLE_ANALYSES } from "@/data/articleAnalysis";
import type { ArticleAnalysis } from "@/types/analysis";

export function getArticleAnalysis(articleId: string): ArticleAnalysis | null {
  return ARTICLE_ANALYSES.find((a) => a.articleId === articleId) ?? null;
}
