import type { CategorySlug } from "@/types/article";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Kicker text color for this category's accent (no background chip). */
  textClass: string;
  /** Active-state underline color for section navigation. */
  borderClass: string;
  /** Solid accent bar color, used next to the Featured article. */
  barClass: string;
  /** Very light wash background — Featured tint, subfield chips, selected Reading Level pill. Same hue as textClass, lightest shade. */
  tintBgClass: string;
  /** Light border to pair with tintBgClass (subfield chips). */
  tintBorderClass: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "physics",
    name: "Physics",
    textClass: "text-blue-700",
    borderClass: "border-blue-600",
    barClass: "bg-blue-600",
    tintBgClass: "bg-blue-50",
    tintBorderClass: "border-blue-200",
  },
  {
    slug: "biology",
    name: "Biology",
    textClass: "text-green-700",
    borderClass: "border-green-600",
    barClass: "bg-green-600",
    tintBgClass: "bg-green-50",
    tintBorderClass: "border-green-200",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    textClass: "text-violet-700",
    borderClass: "border-violet-600",
    barClass: "bg-violet-600",
    tintBgClass: "bg-violet-50",
    tintBorderClass: "border-violet-200",
  },
  {
    slug: "space",
    name: "Space",
    textClass: "text-indigo-700",
    borderClass: "border-indigo-600",
    barClass: "bg-indigo-600",
    tintBgClass: "bg-indigo-50",
    tintBorderClass: "border-indigo-200",
  },
  {
    slug: "environment",
    name: "Environment",
    textClass: "text-amber-700",
    borderClass: "border-amber-600",
    barClass: "bg-amber-600",
    tintBgClass: "bg-amber-50",
    tintBorderClass: "border-amber-200",
  },
];

export function getCategory(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value);
}
