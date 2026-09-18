import type { ArticleAnalysis as ArticleAnalysisData } from "@/types/analysis";

interface ArticleAnalysisProps {
  analysis: ArticleAnalysisData | null;
}

export default function ArticleAnalysis({ analysis }: ArticleAnalysisProps) {
  if (!analysis) {
    return (
      <div className="border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        This article hasn&apos;t been analyzed yet — a difficulty level and
        prerequisite knowledge aren&apos;t available.
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
          Prerequisite Knowledge
        </h2>
        <ol className="mt-2 flex flex-col gap-2">
          {analysis.prerequisites.map((concept, i) => (
            <li key={concept} className="flex items-baseline gap-3 text-base text-zinc-700">
              <span className="font-serif text-zinc-400">{i + 1}.</span>
              {concept}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
