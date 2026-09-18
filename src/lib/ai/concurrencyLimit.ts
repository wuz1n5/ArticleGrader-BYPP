const MAX_CONCURRENT_AI_CALLS = 3;

let active = 0;
const queue: Array<() => void> = [];

function dequeue() {
  if (active >= MAX_CONCURRENT_AI_CALLS || queue.length === 0) return;
  active++;
  const run = queue.shift()!;
  run();
}

// The single gate every real OpenAI call in this app must pass through —
// currently only src/app/api/analyze/route.ts (the cron job). Bounds
// concurrency within one running instance only; a concurrent/duplicate cron
// invocation on a different instance is a separate case, guarded instead by
// the atomic DB claim in articleAnalysisRepository.ts (claimArticle).
export function limitAnalysisConcurrency<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    queue.push(() => {
      fn()
        .then(resolve, reject)
        .finally(() => {
          active--;
          dequeue();
        });
    });
    dequeue();
  });
}
