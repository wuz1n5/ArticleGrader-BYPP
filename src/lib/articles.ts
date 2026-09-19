import articlesData from "@/data/articles.json";
import { getScienceDailyArticles } from "@/lib/rss/getScienceDailyArticles";
import { getCompletedAnalyses } from "@/lib/db/articleAnalysisRepository";
import type { Article, CategorySlug, DifficultyLevel } from "@/types/article";

// Mock JSON only has a single `category` field (pre-dates multi-category RSS
// support) — normalize in memory so mock articles satisfy the same Article
// shape as RSS-derived ones. The JSON file itself is untouched.
const mockArticles: Article[] = (articlesData as Omit<Article, "categories" | "subfields">[]).map(
  (a) => ({
    ...a,
    categories: [a.category],
    subfields: [],
  })
);

export interface ArticleFilter {
  category?: CategorySlug;
  difficulty?: DifficultyLevel;
}

export interface HomeArticles {
  featured: Article | null;
  rest: Article[];
}

// Pure DB read — no OpenAI call in this path. Difficulty comes entirely from
// whatever the cron job (src/app/api/analyze/route.ts) has already analyzed
// and stored; one batched query covers every article in the current feed.
async function enrichWithStoredDifficulty(articles: Article[]): Promise<Article[]> {
  const analyses = await getCompletedAnalyses(articles.map((a) => a.id));
  return articles.map((a) => ({
    ...a,
    difficulty: analyses.get(a.id)?.difficulty ?? null,
    subfields: analyses.get(a.id)?.subfields ?? [],
  }));
}

async function getAllArticles(): Promise<Article[]> {
  const result = await getScienceDailyArticles();

  if (!result.ok) {
    console.error("[rss] ScienceDaily feed unavailable:", result.reason);
  }

  const rssArticles = result.ok ? result.articles : [];
  const isDev = process.env.NODE_ENV !== "production";
  if (rssArticles.length === 0 && isDev) {
    return mockArticles; // dev-only fallback — already has real difficulty, not DB-enriched
  }
  return enrichWithStoredDifficulty(rssArticles);
}

export async function getHomeArticles(filter: ArticleFilter): Promise<HomeArticles> {
  const source = await getAllArticles();

  const filtered = source
    .filter((a) => !filter.category || a.categories.includes(filter.category))
    .filter((a) => !filter.difficulty || a.difficulty === filter.difficulty)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  const [featured = null, ...rest] = filtered;
  return { featured, rest };
}

export async function getArticleById(id: string): Promise<Article | null> {
  const source = await getAllArticles();
  return source.find((a) => a.id === id) ?? null;
}
