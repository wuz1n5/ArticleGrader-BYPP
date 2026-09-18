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
  /** All ScienceDaily topic feeds this article actually appears in. Always at least 1. */
  categories: CategorySlug[];
  /** Display-only: categories[0]. Not used for storage, AI prompts, or filtering — see getScienceDailyArticles.ts. */
  category: CategorySlug;
  /** TEMPORARY: null means "not yet analyzed" — never replace with a guessed value. */
  difficulty: DifficultyLevel | null;
  source: string;
  publishedAt: string;
  /** External source URL (e.g. the ScienceDaily article). Absent for mock articles. */
  originalUrl?: string;
}
