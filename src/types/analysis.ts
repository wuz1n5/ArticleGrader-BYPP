import type { DifficultyLevel } from "./article";

export interface LearningStep {
  /** Stable slug (e.g. "cosmic-rays"). Not used by the MVP UI directly — reserved
   *  so a future version could add `dependsOn?: string[]` for non-linear paths
   *  without redesigning this array. */
  id: string;
  title: string;
  guidingQuestion: string;
  /** Short explanation a newcomer to this concept can follow. */
  explanation: string;
  /** Why learning this concept (in this position in the sequence) helps in
   *  understanding the target article. Not necessarily a strict prerequisite —
   *  see learningPath's doc comment below. */
  whyNeeded: string;
}

export interface ArticleAnalysis {
  /** Matches Article.id */
  articleId: string;
  difficulty: DifficultyLevel;
  difficultyReason: string;
  /**
   * Ordered easy → hard: an ordered LEARNING SEQUENCE that helps a reader
   * build up to understanding the article, not a strict prerequisite
   * dependency graph. An earlier step MAY be a true prerequisite for a later
   * one, but that isn't assumed for every pair — don't force artificial
   * "must learn A before B" relationships where the real relationship is
   * just "learning A first makes B easier to follow". This matters most for
   * future automated generation of this field: it should never invent
   * dependency relationships that aren't really there just to justify an
   * ordering.
   */
  learningPath: LearningStep[];
}
