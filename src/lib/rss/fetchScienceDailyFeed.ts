export async function fetchScienceDailyRssXml(url: string): Promise<string> {
  const res = await fetch(url, {
    next: { revalidate: 600 },
    headers: { "User-Agent": "ArticleGrade/0.1 (+dev)" },
  });

  if (!res.ok) {
    throw new Error(`ScienceDaily RSS fetch failed (${url}): ${res.status}`);
  }

  return res.text();
}
