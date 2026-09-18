import { getSql } from "./client";
import type { ArticleAnalysis, LearningStep } from "@/types/analysis";

interface AnalysisRow {
  article_id: string;
  difficulty: number;
  difficulty_reason: string;
  learning_path: LearningStep[];
}

// Batched lookup — call once per page render with every currently-listed
// article id, not once per article.
export async function getCompletedAnalyses(
  articleIds: string[]
): Promise<Map<string, ArticleAnalysis>> {
  if (articleIds.length === 0) return new Map();

  const sql = getSql();
  const rows = (await sql`
    SELECT article_id, difficulty, difficulty_reason, learning_path
    FROM article_analysis
    WHERE article_id = ANY(${articleIds})
      AND status = 'complete'
  `) as AnalysisRow[];

  return new Map(
    rows.map((row) => [
      row.article_id,
      {
        articleId: row.article_id,
        difficulty: row.difficulty as ArticleAnalysis["difficulty"],
        difficultyReason: row.difficulty_reason,
        learningPath: row.learning_path,
      },
    ])
  );
}

/**
 * Atomically claims an article for analysis. Returns true if this call
 * claimed it (a fresh row, or a stale pending claim older than 1 hour),
 * false if it's already complete or actively claimed by another run.
 *
 * Safe against concurrent/duplicate cron invocations: article_id is the
 * primary key, so the INSERT ... ON CONFLICT is atomic in Postgres — only
 * one caller ever wins the race for a given article, regardless of how many
 * cron runs (or duplicate deliveries of the same run) attempt it at once.
 */
export async function claimArticle(
  articleId: string,
  source: string,
  categories: string[]
): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO article_analysis (article_id, source, category, status, claimed_at)
    VALUES (${articleId}, ${source}, ${categories}, 'pending', now())
    ON CONFLICT (article_id) DO UPDATE
      SET claimed_at = now()
      WHERE article_analysis.status = 'pending'
        AND article_analysis.claimed_at < now() - interval '1 hour'
    RETURNING article_id
  `;
  return rows.length > 0;
}

export async function completeArticle(
  articleId: string,
  result: { difficulty: number; difficultyReason: string; learningPath: LearningStep[] }
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE article_analysis
    SET status = 'complete',
        difficulty = ${result.difficulty},
        difficulty_reason = ${result.difficultyReason},
        learning_path = ${JSON.stringify(result.learningPath)}::jsonb,
        analyzed_at = now()
    WHERE article_id = ${articleId}
  `;
}
