import type { CategorySlug } from "@/types/article";

// Official ScienceDaily topic RSS feeds, one per ArticleGrade category.
// Verified live (HTTP 200, same rss>channel>item structure as physics.xml)
// against sciencedaily.com directly before adding.
export const SCIENCEDAILY_FEEDS: Record<CategorySlug, string> = {
  physics: "https://www.sciencedaily.com/rss/matter_energy/physics.xml",
  biology: "https://www.sciencedaily.com/rss/plants_animals/biology.xml",
  "computer-science": "https://www.sciencedaily.com/rss/computers_math/computer_science.xml",
  space: "https://www.sciencedaily.com/rss/space_time.xml",
  environment: "https://www.sciencedaily.com/rss/earth_climate.xml",
};
