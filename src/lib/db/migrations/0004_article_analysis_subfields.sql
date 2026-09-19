-- Small, fixed-taxonomy subtopic tags (src/lib/subfields.ts) shown on the
-- article card and detail page. Independent of difficulty/learning_path/
-- prompt_version — NOT stamped with prompt_version, since it's a separate
-- concern from difficulty-judging/learning-path generation. NULL means "not
-- yet tagged"; existing rows stay NULL until backfilled (see
-- scripts/backfill-subfields.ts), never re-deriving difficulty/learning_path.
ALTER TABLE article_analysis
  ADD COLUMN subfields TEXT[];
