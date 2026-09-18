import { getCategory } from "@/lib/categories";
import { getDifficulty } from "@/lib/difficulty";
import type { CategorySlug, DifficultyLevel } from "@/types/article";

interface ArticleMetaProps {
  category: CategorySlug;
  difficulty: DifficultyLevel;
  source: string;
  publishedAt: string;
}

export default function ArticleMeta({
  category,
  difficulty,
  source,
  publishedAt,
}: ArticleMetaProps) {
  const categoryInfo = getCategory(category);
  const difficultyInfo = getDifficulty(difficulty);
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {categoryInfo && (
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${categoryInfo.badgeClass}`}
        >
          {categoryInfo.name}
        </span>
      )}
      {difficultyInfo && (
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold ${difficultyInfo.badgeClass}`}
        >
          {difficultyInfo.label}
        </span>
      )}
      <span className="text-zinc-500">
        {source} · {date}
      </span>
    </div>
  );
}
