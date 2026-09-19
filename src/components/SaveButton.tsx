"use client";

import { useSyncExternalStore } from "react";
import {
  readSavedIds,
  toggleSavedArticle,
  subscribeToSavedArticles,
  getServerSavedIds,
} from "@/lib/savedArticles";

interface SaveButtonProps {
  articleId: string;
  className?: string;
}

// useSyncExternalStore reads localStorage — this is the standard React
// pattern for an external mutable source, and it's what keeps SSR markup
// (getServerSavedIds -> []) and the client's first paint in sync without a
// hydration mismatch.
export default function SaveButton({ articleId, className }: SaveButtonProps) {
  const saved = useSyncExternalStore(
    subscribeToSavedArticles,
    () => readSavedIds().includes(articleId),
    () => getServerSavedIds().includes(articleId)
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Card/Featured titles are separate <Link>s, not ancestors of this
    // button, so this isn't strictly needed to avoid navigation — kept as a
    // cheap safeguard against any future nesting.
    e.preventDefault();
    e.stopPropagation();
    toggleSavedArticle(articleId);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved articles" : "Save article"}
      title={saved ? "Saved" : "Save"}
      className={`shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 ${saved ? "text-zinc-900" : ""} ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-4 w-4"
      >
        <path
          d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5l-6-4.5-6 4.5V3.75Z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
