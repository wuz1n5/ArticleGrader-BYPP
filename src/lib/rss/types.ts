import type { Article } from "@/types/article";

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid?: string;
}

export type ScienceDailyFeedResult =
  | { ok: true; articles: Article[] }
  | { ok: false; reason: string };
