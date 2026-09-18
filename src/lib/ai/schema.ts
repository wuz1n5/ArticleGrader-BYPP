import { z } from "zod";

export const AiLearningStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  guidingQuestion: z.string(),
  explanation: z.string(),
  whyNeeded: z.string(),
});

export const AiArticleAnalysisSchema = z.object({
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  difficultyReason: z.string(),
  learningPath: z.array(AiLearningStepSchema).min(1),
});

export type AiArticleAnalysis = z.infer<typeof AiArticleAnalysisSchema>;
