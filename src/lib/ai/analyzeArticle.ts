import { zodTextFormat } from "openai/helpers/zod";
import { getOpenAIClient } from "./client";
import { AiArticleAnalysisSchema, type AiArticleAnalysis } from "./schema";
import { buildAnalysisInput } from "./prompt";

const MODEL = "gpt-5.6-terra";
const TIMEOUT_MS = 20_000; // default 10-minute SDK timeout is far too long for a render-path call

export interface AnalyzeArticleInput {
  title: string;
  summary: string;
  category: string;
}

export async function analyzeArticle(input: AnalyzeArticleInput): Promise<AiArticleAnalysis> {
  const response = await getOpenAIClient().responses.parse(
    {
      model: MODEL,
      input: buildAnalysisInput(input),
      text: { format: zodTextFormat(AiArticleAnalysisSchema, "article_analysis") },
    },
    { timeout: TIMEOUT_MS }
  );

  const parsed = response.output_parsed;
  if (!parsed) {
    throw new Error("OpenAI structured output did not parse");
  }
  return parsed;
}
