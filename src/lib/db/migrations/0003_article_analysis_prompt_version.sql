-- Tracks which SYSTEM_PROMPT version (src/lib/ai/prompt.ts, PROMPT_VERSION)
-- produced a row's analysis. Existing rows default to 1 (the prompt in
-- place before this column existed) without touching their
-- difficulty/difficulty_reason/learning_path values. completeArticle()
-- stamps the current PROMPT_VERSION on every future completion, which is
-- how a future reanalysis pass finds rows judged under an older prompt.
ALTER TABLE article_analysis
  ADD COLUMN prompt_version INTEGER NOT NULL DEFAULT 1;
