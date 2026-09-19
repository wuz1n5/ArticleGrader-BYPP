import SavedArticlesList from "@/components/SavedArticlesList";
import { getHomeArticles } from "@/lib/articles";

export default async function SavedPage() {
  // No category/difficulty filter — the full current feed, so we can match
  // it against whatever article IDs are saved in localStorage.
  const { featured, rest } = await getHomeArticles({});
  const articles = featured ? [featured, ...rest] : rest;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <h1 className="mb-6 text-sm font-bold uppercase tracking-widest text-zinc-900">
        Saved Articles
      </h1>
      <SavedArticlesList articles={articles} />
    </main>
  );
}
