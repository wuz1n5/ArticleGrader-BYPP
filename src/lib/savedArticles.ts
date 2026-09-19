// Shared localStorage-backed "saved articles" store. Used by both
// SaveButton (toggle) and SavedArticlesList (/saved page) so there is only
// ever one storage key and one read/write implementation.
const STORAGE_KEY = "articlegrade:savedArticles";
const CHANGE_EVENT = "articlegrade:savedArticles-change";

const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

// Returns a referentially-stable array (same reference until the underlying
// localStorage value actually changes) — required for useSyncExternalStore,
// which expects getSnapshot() to return a cached value rather than a new
// array on every call (otherwise React treats every render as a change).
export function readSavedIds(): string[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedIds = raw ? JSON.parse(raw) : EMPTY;
    } catch {
      cachedIds = EMPTY;
    }
  }
  return cachedIds;
}

function writeSavedIds(ids: string[]) {
  const raw = JSON.stringify(ids);
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // localStorage unavailable (private mode, quota) — save is best-effort only
  }
  cachedRaw = raw;
  cachedIds = ids;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Returns the new saved state (true = now saved).
export function toggleSavedArticle(articleId: string): boolean {
  const ids = readSavedIds();
  const saved = ids.includes(articleId);
  const next = saved ? ids.filter((id) => id !== articleId) : [...ids, articleId];
  writeSavedIds(next);
  return !saved;
}

export function subscribeToSavedArticles(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function getServerSavedIds(): string[] {
  return EMPTY;
}
