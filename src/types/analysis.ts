import type { DifficultyLevel } from "./article";

export interface LearningStep {
  /** Stable slug (e.g. "cosmic-rays"). Not used by the MVP UI directly — reserved
   *  so a future version could add `dependsOn?: string[]` for non-linear paths
   *  without redesigning this array. */
  id: string;
  title: string;
  guidingQuestion: string;
  /** Short explanation, scoped to only what this article's core claim requires. */
  explanation: string;
  /** A conceptual question connecting this step back to the article's claim —
   *  answer revealed via checkAnswer. Absent on prompt_version < 3 rows. */
  checkQuestion?: string;
  /** Answer/explanation for checkQuestion. Absent on prompt_version < 3 rows. */
  checkAnswer?: string;
  /** @deprecated Legacy field from prompt_version < 3 rows only. Never
   *  written by current analyses, never rendered by the UI — kept solely so
   *  old DB rows still satisfy this type when read. */
  whyNeeded?: string;
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
  /** 1-3 fixed-taxonomy subtopic tags (src/lib/subfields.ts). Empty until
   *  backfilled — independent of difficulty/learningPath/prompt_version. */
  subfields: string[];
}
