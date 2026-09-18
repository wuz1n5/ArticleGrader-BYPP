import articlesData from "@/data/articles.json";
import { getScienceDailyArticles } from "@/lib/rss/getScienceDailyArticles";
import type { Article, CategorySlug, DifficultyLevel } from "@/types/article";

const mockArticles: Article[] = articlesData as Article[];

export interface ArticleFilter {
  category?: CategorySlug;
  difficulty?: DifficultyLevel;
}

export interface HomeArticles {
  featured: Article | null;
  rest: Article[];
}

async function getAllArticles(): Promise<Article[]> {
  const result = await getScienceDailyArticles();

  if (!result.ok) {
    console.error("[rss] ScienceDaily feed unavailable:", result.reason);
  }

  const rssArticles = result.ok ? result.articles : [];
  const isDev = process.env.NODE_ENV !== "production";
  return rssArticles.length === 0 && isDev ? mockArticles : rssArticles;
}

export async function getHomeArticles(filter: ArticleFilter): Promise<HomeArticles> {
  const source = await getAllArticles();

  const filtered = source
    .filter((a) => !filter.category || a.category === filter.category)
    .filter((a) => !filter.difficulty || a.difficulty === filter.difficulty)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  const [featured = null, ...rest] = filtered;
  return { featured, rest };
}

export async function getArticleById(id: string): Promise<Article | null> {
  const source = await getAllArticles();
  return source.find((a) => a.id === id) ?? null;
}
