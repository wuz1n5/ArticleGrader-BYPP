import type { DifficultyLevel } from "./article";

export interface ArticleAnalysis {
  /** Matches Article.id */
  articleId: string;
  difficulty: DifficultyLevel;
  difficultyReason: string;
  /** Ordered easy → hard. */
  prerequisites: string[];
}
