"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "articlegrade:savedArticles";
const CHANGE_EVENT = "articlegrade:savedArticles-change";

function readSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeSavedIds(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable (private mode, quota) — save is best-effort only
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getServerSnapshot() {
  return false;
}

interface SaveButtonProps {
  articleId: string;
  className?: string;
}

// useSyncExternalStore reads localStorage — this is the standard React
// pattern for an external mutable source, and it's what keeps SSR markup
// (getServerSnapshot -> false) and the client's first paint in sync without
// a hydration mismatch.
export default function SaveButton({ articleId, className }: SaveButtonProps) {
  const saved = useSyncExternalStore(
    subscribe,
    () => readSavedIds().includes(articleId),
    getServerSnapshot
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Card/Featured titles are separate <Link>s, not ancestors of this
    // button, so this isn't strictly needed to avoid navigation — kept as a
    // cheap safeguard against any future nesting.
    e.preventDefault();
    e.stopPropagation();

    const ids = readSavedIds();
    const next = saved ? ids.filter((id) => id !== articleId) : [...ids, articleId];
    writeSavedIds(next);
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
