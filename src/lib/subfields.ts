import type { CategorySlug } from "@/types/article";

// Fixed taxonomy — the AI must pick from these exact strings, never invent
// new ones. Display-only tags (no filtering/routing), so plain Title Case
// strings are the values stored in DB and rendered directly, no slug layer.
export const SUBFIELD_TAXONOMY: Record<CategorySlug, string[]> = {
  physics: [
    "Quantum Physics",
    "Particle Physics",
    "Nuclear Physics",
    "Astrophysics",
    "Condensed Matter",
    "Optics & Photonics",
    "Electromagnetism",
    "Thermodynamics",
    "Fluid Dynamics",
    "Materials Physics",
  ],
  biology: [
    "Genetics",
    "Evolution",
    "Molecular Biology",
    "Cell Biology",
    "Microbiology",
    "Neuroscience",
    "Ecology",
    "Zoology",
    "Botany",
    "Biotechnology",
  ],
  "computer-science": [
    "Artificial Intelligence",
    "Cybersecurity",
    "Cryptography",
    "Networks",
    "Software",
    "Algorithms",
    "Data Science",
    "Computer Systems",
    "Robotics",
    "Quantum Computing",
  ],
  space: [
    "Astronomy",
    "Cosmology",
    "Planetary Science",
    "Exoplanets",
    "Stars",
    "Galaxies",
    "Solar System",
    "Space Exploration",
    "Space Technology",
    "Astrobiology",
  ],
  environment: [
    "Climate Science",
    "Ecology",
    "Conservation",
    "Pollution",
    "Oceans",
    "Atmosphere",
    "Geoscience",
    "Natural Disasters",
    "Renewable Energy",
    "Environmental Technology",
  ],
};

// An article can belong to more than one category feed (see CategorySlug[]
// on Article) — the allowed tag set is the union of each category's
// taxonomy, deduplicated.
export function getAllowedSubfields(categories: CategorySlug[]): string[] {
  const set = new Set<string>();
  for (const category of categories) {
    for (const tag of SUBFIELD_TAXONOMY[category] ?? []) {
      set.add(tag);
    }
  }
  return [...set];
}
