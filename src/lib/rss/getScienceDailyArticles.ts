import { fetchScienceDailyRssXml } from "./fetchScienceDailyFeed";
import { parseRssItems } from "./parseRssXml";
import { rssItemToArticle } from "./toArticle";
import { SCIENCEDAILY_FEEDS } from "./feedSources";
import { CATEGORIES } from "@/lib/categories";
import type { Article, CategorySlug } from "@/types/article";
import type { RssItem, ScienceDailyFeedResult } from "./types";

interface FeedFetchResult {
  category: CategorySlug;
  items: RssItem[];
}

async function fetchAndParseFeed(category: CategorySlug): Promise<FeedFetchResult> {
  const xml = await fetchScienceDailyRssXml(SCIENCEDAILY_FEEDS[category]);
  return { category, items: parseRssItems(xml) };
}

// Fetches all 5 category feeds and merges them by article id. The same
// ScienceDaily article commonly appears in more than one topic feed (e.g.
// physics.xml and space_time.xml both listed the same article in ~17/60
// cases when checked) — instead of picking one category as "the" winner,
// every id keeps the full list of feeds it was found in (Article.categories).
// A single feed failing doesn't take down the others: ok:true as long as at
// least one feed succeeded; ok:false only if all 5 failed.
export async function getScienceDailyArticles(): Promise<ScienceDailyFeedResult> {
  const outcomes = await Promise.allSettled(
    CATEGORIES.map((c) => fetchAndParseFeed(c.slug))
  );

  const succeeded: FeedFetchResult[] = [];
  const failures: string[] = [];
  for (const outcome of outcomes) {
    if (outcome.status === "fulfilled") {
      succeeded.push(outcome.value);
    } else {
      failures.push(
        outcome.reason instanceof Error ? outcome.reason.message : String(outcome.reason)
      );
    }
  }

  if (succeeded.length === 0) {
    return { ok: false, reason: failures.join("; ") || "All ScienceDaily feeds failed" };
  }

  for (const reason of failures) {
    console.error("[rss] ScienceDaily feed unavailable:", reason);
  }

  // Feeds are merged in CATEGORIES order, so the resulting categories[] (and
  // the derived display-only Article.category = categories[0]) is
  // deterministic — but this order no longer decides DB storage, AI prompt
  // content, or filtering (all of those use the full categories[] array),
  // only which single badge color a not-yet-filtered card shows.
  const merged = new Map<string, { item: RssItem; categories: CategorySlug[] }>();
  for (const { category, items } of succeeded) {
    for (const item of items) {
      const id = item.guid ?? item.link;
      const existing = merged.get(id);
      if (existing) {
        existing.categories.push(category);
      } else {
        merged.set(id, { item, categories: [category] });
      }
    }
  }

  const articles: Article[] = Array.from(merged.values()).map(({ item, categories }) =>
    rssItemToArticle(item, categories)
  );

  return { ok: true, articles };
}
