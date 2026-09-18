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
