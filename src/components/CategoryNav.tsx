import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { CategorySlug } from "@/types/article";

interface CategoryNavProps {
  activeCategory?: CategorySlug;
  difficultyParam?: string;
}

function buildHref(category: string | undefined, difficultyParam: string | undefined) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (difficultyParam) params.set("difficulty", difficultyParam);
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export default function CategoryNav({
  activeCategory,
  difficultyParam,
}: CategoryNavProps) {
  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-6 py-3 text-sm font-medium">
        <Link
          href={buildHref(undefined, difficultyParam)}
          className={
            !activeCategory
              ? "text-zinc-900 underline underline-offset-4"
              : "text-zinc-500 hover:text-zinc-900"
          }
        >
          All Fields
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={buildHref(category.slug, difficultyParam)}
            className={
              activeCategory === category.slug
                ? "text-zinc-900 underline underline-offset-4"
                : "text-zinc-500 hover:text-zinc-900"
            }
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
