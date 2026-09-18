import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

// Lazily constructed for the same reason as src/lib/ai/client.ts: building
// eagerly at module scope runs during `next build`'s page data collection
// even for routes that never call it, and would fail the build whenever
// DATABASE_URL isn't set in that environment. Constructing on first real use
// means the build always succeeds, and a missing/invalid connection string
// only surfaces as a normal query failure.
export function getSql(): NeonQueryFunction<false, false> {
  if (!sql) {
    sql = neon(process.env.DATABASE_URL!);
  }
  return sql;
}
