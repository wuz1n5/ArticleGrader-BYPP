import { z } from "zod";

export const AiLearningStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  guidingQuestion: z.string(),
  explanation: z.string(),
  checkQuestion: z.string(),
  checkAnswer: z.string(),
});

export const AiArticleAnalysisSchema = z.object({
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  difficultyReason: z.string(),
  learningPath: z.array(AiLearningStepSchema).min(1),
});

export type AiArticleAnalysis = z.infer<typeof AiArticleAnalysisSchema>;

// Used only for reanalyzing an already-analyzed article's Learning Path
// (prompt_version backfill) without re-deriving difficulty/difficultyReason —
// see buildLearningPathOnlyInput in prompt.ts.
export const AiLearningPathOnlySchema = z.object({
  learningPath: z.array(AiLearningStepSchema).min(1),
});

export type AiLearningPathOnly = z.infer<typeof AiLearningPathOnlySchema>;

// Used for generating an article's subfield tags — a small, independent
// concern from difficulty/learningPath, see buildSubfieldsInput in
// prompt.ts. Validated against the allowed taxonomy after parsing (see
// generateSubfields.ts), since the allowed set varies per article and can't
// be expressed as a static z.enum here.
export const AiSubfieldsSchema = z.object({
  subfields: z.array(z.string()).min(1).max(3),
});

export type AiSubfields = z.infer<typeof AiSubfieldsSchema>;
