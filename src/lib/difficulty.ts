import type { DifficultyLevel } from "@/types/article";

export interface DifficultyInfo {
  level: DifficultyLevel;
  label: string;
  description: string;
  badgeClass: string;
}

export const DIFFICULTY_LEVELS: DifficultyInfo[] = [
  {
    level: 1,
    label: "Lv.1 Beginner",
    description: "A science story readable with no background knowledge.",
    badgeClass: "bg-zinc-100 text-zinc-600",
  },
  {
    level: 2,
    label: "Lv.2 Basic",
    description: "A few basic scientific terms appear.",
    badgeClass: "bg-zinc-200 text-zinc-700",
  },
  {
    level: 3,
    label: "Lv.3 Intermediate",
    description: "Requires familiarity with several scientific concepts.",
    badgeClass: "bg-zinc-300 text-zinc-800",
  },
  {
    level: 4,
    label: "Lv.4 Advanced",
    description: "Covers algorithms, experimental methods, and technical principles.",
    badgeClass: "bg-zinc-600 text-white",
  },
  {
    level: 5,
    label: "Lv.5 Expert",
    description: "Research-paper-like content with formulas, methods, and jargon.",
    badgeClass: "bg-zinc-900 text-white",
  },
];

export function getDifficulty(level: DifficultyLevel): DifficultyInfo | undefined {
  return DIFFICULTY_LEVELS.find((d) => d.level === level);
}

export function getDifficultyLabel(level: DifficultyLevel): string {
  return getDifficulty(level)?.label ?? `Lv.${level}`;
}

export function isDifficultyLevel(value: number): value is DifficultyLevel {
  return DIFFICULTY_LEVELS.some((d) => d.level === value);
}
