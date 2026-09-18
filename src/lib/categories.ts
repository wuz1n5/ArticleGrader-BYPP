import type { CategorySlug } from "@/types/article";

export interface Category {
  slug: CategorySlug;
  name: string;
  badgeClass: string;
}

export const CATEGORIES: Category[] = [
  { slug: "physics", name: "Physics", badgeClass: "bg-blue-50 text-blue-700" },
  { slug: "biology", name: "Biology", badgeClass: "bg-green-50 text-green-700" },
  {
    slug: "computer-science",
    name: "Computer Science",
    badgeClass: "bg-violet-50 text-violet-700",
  },
  { slug: "space", name: "Space", badgeClass: "bg-indigo-50 text-indigo-700" },
  { slug: "environment", name: "Environment", badgeClass: "bg-amber-50 text-amber-700" },
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
