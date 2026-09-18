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

const linkBase =
  "shrink-0 border-b-2 border-transparent pb-3 pt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 hover:text-zinc-900";
const linkActive = "border-b-2 pb-3 pt-3 text-xs font-semibold uppercase tracking-wide text-zinc-900";

export default function CategoryNav({
  activeCategory,
  difficultyParam,
}: CategoryNavProps) {
  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="no-scrollbar mx-auto flex max-w-5xl gap-x-8 overflow-x-auto px-6 whitespace-nowrap">
        <Link
          href={buildHref(undefined, difficultyParam)}
          className={!activeCategory ? `${linkActive} border-zinc-900` : linkBase}
        >
          All Fields
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={buildHref(category.slug, difficultyParam)}
            className={
              activeCategory === category.slug
                ? `${linkActive} ${category.borderClass}`
                : linkBase
            }
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
