-- The same ScienceDaily article can belong to more than one RSS topic feed
-- (e.g. physics.xml and space_time.xml both list some articles). category
-- becomes an array of every feed it was claimed under, instead of forcing a
-- single arbitrary choice. article_id PK and all AI-analysis columns
-- (difficulty, difficulty_reason, learning_path, status, claimed_at,
-- analyzed_at) are untouched. Existing single-value rows (e.g. 'physics')
-- are preserved as one-element arrays (e.g. {physics}) — not re-derived.
ALTER TABLE article_analysis
  ALTER COLUMN category TYPE TEXT[] USING ARRAY[category];
