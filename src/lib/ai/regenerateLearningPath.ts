import { zodTextFormat } from "openai/helpers/zod";
import { getOpenAIClient } from "./client";
import { AiLearningPathOnlySchema, type AiLearningPathOnly } from "./schema";
import { buildLearningPathOnlyInput } from "./prompt";

const MODEL = "gpt-5.6-terra";
const TIMEOUT_MS = 20_000;

export interface RegenerateLearningPathInput {
  title: string;
  summary: string;
  category: string;
  difficulty: number;
  difficultyReason: string;
}

// Backfills a Learning Path to the current PROMPT_VERSION for an article
// that's already been judged (difficulty/difficultyReason are inputs, not
// outputs) — used only by the one-off reanalysis pass, never by the normal
// cron path (which uses analyzeArticle.ts for brand-new articles).
export async function regenerateLearningPath(
  input: RegenerateLearningPathInput
): Promise<AiLearningPathOnly> {
  const response = await getOpenAIClient().responses.parse(
    {
      model: MODEL,
      input: buildLearningPathOnlyInput(input),
      text: { format: zodTextFormat(AiLearningPathOnlySchema, "learning_path_only") },
    },
    { timeout: TIMEOUT_MS }
  );

  const parsed = response.output_parsed;
  if (!parsed) {
    throw new Error("OpenAI structured output did not parse (learning path only)");
  }
  return parsed;
}
