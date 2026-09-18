import { getCategory } from "@/lib/categories";
import { DIFFICULTY_LEVELS, getDifficulty } from "@/lib/difficulty";
import type { CategorySlug, DifficultyLevel } from "@/types/article";

interface ArticleMetaProps {
  category: CategorySlug;
  difficulty: DifficultyLevel | null;
  source: string;
  publishedAt: string;
  size?: "default" | "large";
}

export default function ArticleMeta({
  category,
  difficulty,
  source,
  publishedAt,
  size = "default",
}: ArticleMetaProps) {
  const categoryInfo = getCategory(category);
  const difficultyInfo = difficulty !== null ? getDifficulty(difficulty) : undefined;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const kickerSize = size === "large" ? "text-sm" : "text-xs";
  const dotSize = size === "large" ? "h-2 w-2" : "h-1.5 w-1.5";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {categoryInfo && (
        <span
          className={`${kickerSize} font-bold uppercase tracking-wider ${categoryInfo.textClass}`}
        >
          {categoryInfo.name}
        </span>
      )}
      {difficultyInfo && (
        <span className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5">
            {DIFFICULTY_LEVELS.map((d) => (
              <span
                key={d.level}
                className={`${dotSize} rounded-full ${
                  d.level <= difficultyInfo.level ? difficultyInfo.fillClass : "bg-zinc-200"
                }`}
              />
            ))}
          </span>
          <span className={`${kickerSize} font-semibold text-zinc-700`}>
            {difficultyInfo.shortLabel}
          </span>
        </span>
      )}
      <span className="text-xs text-zinc-500">
        {source} · {date}
      </span>
    </div>
  );
}
