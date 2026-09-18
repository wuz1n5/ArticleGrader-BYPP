import type { DifficultyLevel } from "@/types/article";

export interface DifficultyInfo {
  level: DifficultyLevel;
  label: string;
  shortLabel: string;
  description: string;
  /** Fill color for meter dots / segmented scale at this level, graduated light-to-dark. */
  fillClass: string;
}

export const DIFFICULTY_LEVELS: DifficultyInfo[] = [
  {
    level: 1,
    label: "Beginner",
    shortLabel: "Lv.1",
    description: "A science story readable with no background knowledge.",
    fillClass: "bg-zinc-400",
  },
  {
    level: 2,
    label: "Basic",
    shortLabel: "Lv.2",
    description: "A few basic scientific terms appear.",
    fillClass: "bg-zinc-500",
  },
  {
    level: 3,
    label: "Intermediate",
    shortLabel: "Lv.3",
    description: "Requires familiarity with several scientific concepts.",
    fillClass: "bg-zinc-600",
  },
  {
    level: 4,
    label: "Advanced",
    shortLabel: "Lv.4",
    description: "Covers algorithms, experimental methods, and technical principles.",
    fillClass: "bg-zinc-800",
  },
  {
    level: 5,
    label: "Expert",
    shortLabel: "Lv.5",
    description: "Research-paper-like content with formulas, methods, and jargon.",
    fillClass: "bg-zinc-900",
  },
];

export function getDifficulty(level: DifficultyLevel): DifficultyInfo | undefined {
  return DIFFICULTY_LEVELS.find((d) => d.level === level);
}

export function getDifficultyLabel(level: DifficultyLevel): string {
  const info = getDifficulty(level);
  return info ? `${info.shortLabel} ${info.label}` : `Lv.${level}`;
}

export function isDifficultyLevel(value: number): value is DifficultyLevel {
  return DIFFICULTY_LEVELS.some((d) => d.level === value);
}
