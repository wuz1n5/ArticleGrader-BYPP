"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import ArticleGrid from "@/components/ArticleGrid";
import { readSavedIds, subscribeToSavedArticles, getServerSavedIds } from "@/lib/savedArticles";
import type { Article } from "@/types/article";

interface SavedArticlesListProps {
  /** Full current article list (server-fetched) to match saved IDs against. */
  articles: Article[];
}

// Only this list needs to be a Client Component (to read localStorage) —
// the /saved page itself and its article data fetch stay server-side.
export default function SavedArticlesList({ articles }: SavedArticlesListProps) {
  const savedIds = useSyncExternalStore(
    subscribeToSavedArticles,
    readSavedIds,
    getServerSavedIds
  );

  const byId = new Map(articles.map((a) => [a.id, a]));
  // Saved order is oldest -> newest; reverse for most-recently-saved-first.
  // IDs no longer in the current feed (byId.get returns undefined) are
  // silently skipped rather than breaking the page.
  const savedArticles = [...savedIds]
    .reverse()
    .map((id) => byId.get(id))
    .filter((a): a is Article => a !== undefined);

  if (savedArticles.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 border border-zinc-200 px-6 py-16 text-sm text-zinc-500">
        <p>No saved articles yet.</p>
        <p>Save articles you want to come back to later.</p>
        <Link href="/" className="mt-2 font-semibold text-zinc-900 hover:underline">
          Browse Articles →
        </Link>
      </div>
    );
  }

  return <ArticleGrid articles={savedArticles} />;
}
