import Link from "next/link";
import { DIFFICULTY_LEVELS } from "@/lib/difficulty";
import type { DifficultyLevel } from "@/types/article";

interface DifficultySelectorProps {
  activeDifficulty?: DifficultyLevel;
  categoryParam?: string;
}

function buildHref(difficulty: number | undefined, categoryParam: string | undefined) {
  const params = new URLSearchParams();
  if (categoryParam) params.set("category", categoryParam);
  if (difficulty) params.set("difficulty", String(difficulty));
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export default function DifficultySelector({
  activeDifficulty,
  categoryParam,
}: DifficultySelectorProps) {
  return (
    <div className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-5">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            Reading Level
          </p>
          <Link
            href={buildHref(undefined, categoryParam)}
            className={
              !activeDifficulty
                ? "text-xs font-semibold text-zinc-900 underline underline-offset-4"
                : "text-xs font-semibold text-zinc-500 hover:text-zinc-900"
            }
          >
            All Levels
          </Link>
        </div>
        <div className="flex divide-x divide-zinc-300 border border-zinc-300 bg-white">
          {DIFFICULTY_LEVELS.map((difficulty) => {
            const isActive = activeDifficulty === difficulty.level;
            return (
              <Link
                key={difficulty.level}
                href={buildHref(difficulty.level, categoryParam)}
                className={`flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center transition-colors ${
                  isActive
                    ? `${difficulty.fillClass} text-white`
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <span className="text-base font-bold leading-none">
                  {difficulty.shortLabel}
                </span>
                <span
                  className={`hidden text-[11px] leading-none sm:block ${
                    isActive ? "text-white/80" : "text-zinc-500"
                  }`}
                >
                  {difficulty.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
