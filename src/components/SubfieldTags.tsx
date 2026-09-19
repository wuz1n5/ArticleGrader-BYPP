import { getCategory } from "@/lib/categories";
import type { CategorySlug } from "@/types/article";

interface SubfieldTagsProps {
  subfields: string[];
  category: CategorySlug;
}

// Small, low-contrast chips tinted with the article's category color —
// intentionally less visually prominent than the category label (small,
// medium-weight, non-uppercase). Display-only: no click behavior, no filtering.
export default function SubfieldTags({ subfields, category }: SubfieldTagsProps) {
  if (subfields.length === 0) return null;

  const categoryInfo = getCategory(category);
  const chipClass = categoryInfo
    ? `${categoryInfo.tintBgClass} ${categoryInfo.tintBorderClass} ${categoryInfo.textClass}`
    : "border-zinc-200 bg-zinc-50 text-zinc-500";

  return (
    <div className="flex flex-wrap gap-1.5">
      {subfields.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${chipClass}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
