import type { ArticleAnalysis } from "@/types/analysis";

// TEMPORARY: hand-written analysis for exactly one currently-live ScienceDaily
// Physics article, to validate the article detail page UX. Not auto-generated,
// and not extended to other articles yet. If ScienceDaily's feed rotates this
// article out, this entry simply stops matching anything and the article
// falls back to "Not yet analyzed" (see src/lib/analysis.ts) — no crash.
export const ARTICLE_ANALYSES: ArticleAnalysis[] = [
  {
    articleId: "https://www.sciencedaily.com/releases/2026/09/260917003725.htm",
    difficulty: 2,
    difficultyReason:
      "Understanding this article only requires two basic, independent ideas: that cosmic rays are a natural, ongoing stream of particles from space passing through everything on Earth, including us, and that a particle detector is simply a device built to register when one of those particles passes through it. Neither idea depends on the other, and the article doesn't require deeper background — how such detectors work internally, how physicists classify different cosmic-ray particles, or the experimental methods used in the 'major experiments' it mentions.",
    prerequisites: [
      "Cosmic rays — a constant stream of high-energy particles from space",
      "Particle detectors — devices that register when a particle passes through them",
    ],
  },
];
