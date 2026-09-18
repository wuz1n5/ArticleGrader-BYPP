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
    <div className="mx-auto max-w-5xl px-6 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Reading Level
      </p>
      <div className="flex flex-wrap gap-2 text-sm font-medium">
        <Link
          href={buildHref(undefined, categoryParam)}
          className={
            !activeDifficulty
              ? "rounded-full bg-zinc-900 px-3 py-1 text-white"
              : "rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 hover:border-zinc-400"
          }
        >
          All Levels
        </Link>
        {DIFFICULTY_LEVELS.map((difficulty) => (
          <Link
            key={difficulty.level}
            href={buildHref(difficulty.level, categoryParam)}
            className={
              activeDifficulty === difficulty.level
                ? "rounded-full bg-zinc-900 px-3 py-1 text-white"
                : "rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 hover:border-zinc-400"
            }
          >
            {difficulty.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
