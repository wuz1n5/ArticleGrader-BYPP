import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Set it in .env.local or your shell environment.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const migrationPath = join(
    __dirname,
    "..",
    "src",
    "lib",
    "db",
    "migrations",
    "0001_article_analysis.sql"
  );
  const migrationSql = readFileSync(migrationPath, "utf-8");

  // The Neon HTTP driver's query() runs one statement per call, so strip
  // full-line comments first (otherwise a leading comment line merges with
  // the next statement in the same semicolon-delimited chunk and the whole
  // chunk gets dropped), then split on statement-terminating semicolons.
  const withoutComments = migrationSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  const statements = withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    console.log(`Running: ${statement.slice(0, 60)}...`);
    await sql.query(statement);
  }

  console.log("Migration applied: 0001_article_analysis.sql");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
