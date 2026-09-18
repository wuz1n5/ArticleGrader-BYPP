const SCIENCEDAILY_PHYSICS_RSS_URL =
  "https://www.sciencedaily.com/rss/matter_energy/physics.xml";

export async function fetchScienceDailyRssXml(): Promise<string> {
  const res = await fetch(SCIENCEDAILY_PHYSICS_RSS_URL, {
    next: { revalidate: 600 },
    headers: { "User-Agent": "ArticleGrade/0.1 (+dev)" },
  });

  if (!res.ok) {
    throw new Error(`ScienceDaily RSS fetch failed: ${res.status}`);
  }

  return res.text();
}
