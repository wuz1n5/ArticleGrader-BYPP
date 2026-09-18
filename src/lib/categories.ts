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
}

export const CATEGORIES: Category[] = [
  {
    slug: "physics",
    name: "Physics",
    textClass: "text-blue-700",
    borderClass: "border-blue-600",
    barClass: "bg-blue-600",
  },
  {
    slug: "biology",
    name: "Biology",
    textClass: "text-green-700",
    borderClass: "border-green-600",
    barClass: "bg-green-600",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    textClass: "text-violet-700",
    borderClass: "border-violet-600",
    barClass: "bg-violet-600",
  },
  {
    slug: "space",
    name: "Space",
    textClass: "text-indigo-700",
    borderClass: "border-indigo-600",
    barClass: "bg-indigo-600",
  },
  {
    slug: "environment",
    name: "Environment",
    textClass: "text-amber-700",
    borderClass: "border-amber-600",
    barClass: "bg-amber-600",
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
