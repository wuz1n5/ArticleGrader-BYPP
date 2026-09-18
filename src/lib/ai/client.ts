import OpenAI from "openai";

let client: OpenAI | null = null;

// Lazily constructed: the OpenAI SDK validates credentials as soon as it's
// instantiated, and this module gets evaluated during `next build`'s page
// data collection even for routes that never end up calling it. Building
// eagerly (`export const openai = new OpenAI()`) fails the build whenever
// OPENAI_API_KEY isn't set. Constructing on first real use means the build
// always succeeds, and a missing key only surfaces as a normal call failure
// inside the cron job (src/app/api/analyze/route.ts), which already treats
// any analysis failure as "leave this article unclaimed, retry next run."
export function getOpenAIClient(): OpenAI {
  if (!client) {
    client = new OpenAI();
  }
  return client;
}
