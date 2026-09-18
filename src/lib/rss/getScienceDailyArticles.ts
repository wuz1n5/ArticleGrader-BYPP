import { fetchScienceDailyRssXml } from "./fetchScienceDailyFeed";
import { parseRssItems } from "./parseRssXml";
import { rssItemToArticle } from "./toArticle";
import type { ScienceDailyFeedResult } from "./types";

export async function getScienceDailyArticles(): Promise<ScienceDailyFeedResult> {
  try {
    const xml = await fetchScienceDailyRssXml();
    const items = parseRssItems(xml);
    return { ok: true, articles: items.map(rssItemToArticle) };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, reason };
  }
}
