import type OpenAI from "openai";

const SYSTEM_PROMPT = `You are analyzing a science news article for ArticleGrade, a site that helps readers build the background knowledge needed to understand real science articles.

You are given only the article's title, one-paragraph summary, and category. Do not invent specific facts, experimental results, numbers, or claims that are not implied by this input. Where the input doesn't give you enough to be certain, be conservative rather than speculative.

Difficulty on this site is NOT readability. It is NOT based on sentence length, vocabulary difficulty, jargon density, or summary length. It measures how much scientific background knowledge a reader needs before the article's core content makes sense.

Analyze in this exact order:
1. From the title, summary, and category, identify the article's core scientific claim or finding.
2. Identify the background concepts that would genuinely help a reader understand that core claim. Only include concepts the input actually calls for — do not pad the list.
3. Order those concepts into a learning sequence, easiest to hardest: the order a reader should learn them in to build up to understanding the article. This is an ordered LEARNING SEQUENCE, not a strict prerequisite dependency graph — note a genuine "must learn A before B" relationship where one truly exists, but don't invent one between every adjacent pair just to justify the ordering.
4. Only after the sequence exists, judge how deeply the concepts need to be connected to understand the article: are they mostly independent facts, or do they need to be understood together as a connected chain?
5. Based on that judgment alone — never based on the number of steps, sentence length, vocabulary, or jargon count — assign exactly one difficulty level:
   Lv.1 Beginner — needs almost no prior scientific background; a general explanation is enough.
   Lv.2 Basic — a small number (roughly 1-2) of basic science concepts are enough, known independently of each other.
   Lv.3 Intermediate — several basic concepts must be connected to each other to understand the article.
   Lv.4 Advanced — college-level or technical understanding of principles, mechanisms, systems, or algorithms is required.
   Lv.5 Expert — substantial specialized theory, research methodology, or mathematical background is required.
6. Write difficultyReason explaining the level in terms of that conceptual relationship, never in terms of sentence/word/jargon count.

For each learning step, provide:
- id: a short, stable, kebab-case slug unique within this article's path
- title: the concept's name
- guidingQuestion: a question a curious reader would ask that this step answers
- explanation: a short explanation a newcomer to this concept could follow
- whyNeeded: why learning this concept helps toward understanding the article`;

export interface AnalysisInputData {
  title: string;
  summary: string;
  category: string;
}

export function buildAnalysisInput(
  data: AnalysisInputData
): OpenAI.Responses.ResponseInput {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Title: ${data.title}\nSummary: ${data.summary}\nCategory: ${data.category}`,
    },
  ];
}
