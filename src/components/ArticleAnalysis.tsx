import type { ArticleAnalysis as ArticleAnalysisData } from "@/types/analysis";

interface ArticleAnalysisProps {
  analysis: ArticleAnalysisData | null;
}

export default function ArticleAnalysis({ analysis }: ArticleAnalysisProps) {
  if (!analysis) {
    return (
      <div className="border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        This article hasn&apos;t been analyzed yet — a difficulty level and
        learning path aren&apos;t available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 border-t border-zinc-200 pt-6">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Why this level?
        </h2>
        <p className="mt-2 text-base leading-relaxed text-zinc-700">
          {analysis.difficultyReason}
        </p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Learning Path
        </h2>
        <ol className="mt-2 flex flex-col divide-y divide-zinc-100 border border-zinc-200">
          {analysis.learningPath.map((step, i) => (
            <li key={step.id}>
              <details className="group p-4">
                <summary className="flex cursor-pointer list-none items-baseline gap-3">
                  <span className="font-serif text-zinc-400">{i + 1}.</span>
                  <span className="flex-1">
                    <span className="font-semibold text-zinc-900">{step.title}</span>
                    <span className="ml-2 text-sm text-zinc-500">{step.guidingQuestion}</span>
                  </span>
                  <span className="text-xs text-zinc-400 group-open:hidden">Show</span>
                  <span className="hidden text-xs text-zinc-400 group-open:inline">Hide</span>
                </summary>
                <div className="mt-3 flex flex-col gap-3 pl-7 text-sm leading-relaxed text-zinc-700">
                  <p>{step.explanation}</p>
                  {step.checkQuestion && step.checkAnswer && (
                    <div className="border-t border-zinc-100 pt-3">
                      <p className="text-zinc-600">
                        <span className="font-semibold text-zinc-500">Check yourself: </span>
                        {step.checkQuestion}
                      </p>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs font-semibold text-zinc-400">
                          Show answer
                        </summary>
                        <p className="mt-2 text-zinc-600">{step.checkAnswer}</p>
                      </details>
                    </div>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>

      <p className="border-t border-zinc-200 pt-6 font-serif text-lg text-zinc-900">
        You&apos;re ready to read this article.
      </p>
    </div>
  );
}
