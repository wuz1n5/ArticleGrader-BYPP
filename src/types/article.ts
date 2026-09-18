export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type CategorySlug =
  | "physics"
  | "biology"
  | "computer-science"
  | "space"
  | "environment";

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: CategorySlug;
  difficulty: DifficultyLevel;
  source: string;
  publishedAt: string;
}
