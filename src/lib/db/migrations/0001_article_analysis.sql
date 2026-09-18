-- ArticleGrade's own generated analysis results only — ScienceDaily's title,
-- summary, and article content are never stored here (see CLAUDE.md / plan).
CREATE TABLE IF NOT EXISTS article_analysis (
  article_id        TEXT PRIMARY KEY,
  source            TEXT NOT NULL,
  category          TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'complete')),
  difficulty        SMALLINT CHECK (difficulty BETWEEN 1 AND 5),
  difficulty_reason TEXT,
  learning_path     JSONB,
  claimed_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  analyzed_at       TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_article_analysis_category ON article_analysis(category);
