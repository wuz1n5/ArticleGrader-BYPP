import type { Article, CategorySlug } from "@/types/article";
import type { RssItem } from "./types";

const DEFAULT_CATEGORY: CategorySlug = "physics"; // physics.xml feed maps 1:1 — not a classifier

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

// TEMPORARY: difficulty is null until prerequisite-based analysis exists —
// never replace with a guessed value.
export function rssItemToArticle(item: RssItem): Article {
  return {
    id: item.guid ?? item.link,
    title: item.title,
    summary: stripHtml(item.description),
    category: DEFAULT_CATEGORY,
    difficulty: null,
    source: "ScienceDaily",
    publishedAt: new Date(item.pubDate).toISOString(), // pubDate already validated in parseRssXml
    originalUrl: item.link,
  };
}
