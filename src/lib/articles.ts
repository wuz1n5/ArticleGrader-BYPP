import articlesData from "@/data/articles.json";
import type { Article, CategorySlug, DifficultyLevel } from "@/types/article";

const articles: Article[] = articlesData as Article[];

export interface ArticleFilter {
  category?: CategorySlug;
  difficulty?: DifficultyLevel;
}

export interface HomeArticles {
  featured: Article | null;
  rest: Article[];
}

export function getHomeArticles(filter: ArticleFilter): HomeArticles {
  const filtered = articles
    .filter((a) => !filter.category || a.category === filter.category)
    .filter((a) => !filter.difficulty || a.difficulty === filter.difficulty)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  const [featured = null, ...rest] = filtered;
  return { featured, rest };
}
