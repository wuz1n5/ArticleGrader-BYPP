import { zodTextFormat } from "openai/helpers/zod";
import { getOpenAIClient } from "./client";
import { AiSubfieldsSchema } from "./schema";
import { buildSubfieldsInput } from "./prompt";

const MODEL = "gpt-5.6-terra";
const TIMEOUT_MS = 20_000; // same render-path budget as analyzeArticle.ts

export interface GenerateSubfieldsInput {
  title: string;
  summary: string;
  category: string;
  allowedSubfields: string[];
}

// Throws if the model returns anything outside allowedSubfields — callers
// treat that identically to any other generation failure (article's
// existing data is left untouched, retried on a later run).
export async function generateSubfields(input: GenerateSubfieldsInput): Promise<string[]> {
  const response = await getOpenAIClient().responses.parse(
    {
      model: MODEL,
      input: buildSubfieldsInput(input),
      text: { format: zodTextFormat(AiSubfieldsSchema, "subfields") },
    },
    { timeout: TIMEOUT_MS }
  );

  const parsed = response.output_parsed;
  if (!parsed) {
    throw new Error("OpenAI structured output did not parse (subfields)");
  }

  const allowed = new Set(input.allowedSubfields);
  const invalid = parsed.subfields.filter((tag) => !allowed.has(tag));
  if (invalid.length > 0) {
    throw new Error(`Model returned tags outside the allowed taxonomy: ${invalid.join(", ")}`);
  }

  return parsed.subfields;
}
