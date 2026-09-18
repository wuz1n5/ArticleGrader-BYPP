import { XMLParser } from "fast-xml-parser";
import type { RssItem } from "./types";

const parser = new XMLParser({ ignoreAttributes: true });

function isValidDate(value: string): boolean {
  return value.length > 0 && !Number.isNaN(new Date(value).getTime());
}

export function parseRssItems(xml: string): RssItem[] {
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item;
  const list = Array.isArray(items) ? items : items ? [items] : [];

  return list
    .map(
      (item): RssItem => ({
        title: String(item?.title ?? "").trim(),
        link: String(item?.link ?? "").trim(),
        description: String(item?.description ?? "").trim(),
        pubDate: String(item?.pubDate ?? "").trim(),
        guid: item?.guid ? String(item.guid) : undefined,
      })
    )
    .filter((item) => {
      const hasTitle = item.title.length > 0;
      const hasLink = item.link.length > 0;
      const hasValidPubDate = isValidDate(item.pubDate);
      const valid = hasTitle && hasLink && hasValidPubDate;

      if (!valid) {
        console.warn(
          "[rss] Skipping ScienceDaily item with missing or invalid fields.",
          item
        );
      }

      return valid;
    });
}
