import type { Article, CategorySlug } from "@/types/article";
import type { RssItem } from "./types";

// Minimal local normalization, not a general HTML parser: strips stray inline
// tags/entities the feed occasionally includes, nothing more.
function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// categories: every ScienceDaily feed this item was found in (see
// getScienceDailyArticles.ts) — always at least 1. `category` is derived as
// categories[0] purely for the single-badge UI; nothing else reads it.
// TEMPORARY: difficulty is null until prerequisite-based analysis exists —
// never replace with a guessed value.
export function rssItemToArticle(item: RssItem, categories: CategorySlug[]): Article {
  return {
    id: item.guid ?? item.link,
    title: item.title,
    summary: stripHtml(item.description),
    categories,
    category: categories[0],
    difficulty: null,
    subfields: [],
    source: "ScienceDaily",
    publishedAt: new Date(item.pubDate).toISOString(), // pubDate already validated in parseRssXml
    originalUrl: item.link,
  };
}
