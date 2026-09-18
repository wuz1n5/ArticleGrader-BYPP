import type { ArticleAnalysis } from "@/types/analysis";

// TEMPORARY: hand-written analysis for exactly one currently-live ScienceDaily
// Physics article, to validate the article detail page UX. Not auto-generated,
// and not extended to other articles yet. If ScienceDaily's feed rotates this
// article out, this entry simply stops matching anything and the article
// falls back to "Not yet analyzed" (see src/lib/analysis.ts) — no crash.
export const ARTICLE_ANALYSES: ArticleAnalysis[] = [
  {
    articleId: "https://www.sciencedaily.com/releases/2026/09/260917003725.htm",
    difficulty: 3,
    difficultyReason:
      "Understanding this article requires connecting several basic physics concepts rather than knowing them in isolation: that a constant stream of cosmic particles exists, that such particles reveal themselves through their interaction with matter, and that a detector is built to capture that interaction. It's the relationship between these ideas — not how many of them there are — that makes this Lv.3 rather than Lv.2: the significance of a cheap, portable detector only comes into focus once you see how the ideas connect.",
    learningPath: [
      {
        id: "cosmic-rays",
        title: "Cosmic Rays",
        guidingQuestion: "What are the 'invisible particles' the article talks about?",
        explanation:
          "Cosmic rays are a constant stream of high-energy particles arriving from space. They're hitting the Earth — and you — all the time, but they're far too small and fast to see or feel.",
        whyNeeded:
          "The article's whole premise — a device that reveals particles 'raining down from space' — only makes sense once you know this stream of particles exists and never stops.",
      },
      {
        id: "particle-matter-interaction",
        title: "How Particles Interact With Matter",
        guidingQuestion: "If these particles are invisible, how could anything possibly detect them?",
        explanation:
          "As a fast-moving particle passes through a material, it can disturb the atoms it passes near — for example, knocking loose a tiny bit of charge or producing a faint flash of light. That disturbance is small, but sensitive equipment can pick it up.",
        whyNeeded:
          "This is the missing link between 'invisible particle' and 'detector that sees it': the particle itself isn't seen, its faint interaction with the detector's material is. Without this idea, a 'particle detector' sounds like magic.",
      },
      {
        id: "particle-detectors",
        title: "Particle Detectors",
        guidingQuestion: "What is a particle detector, and why does it matter that this one costs $100?",
        explanation:
          "A particle detector is a device built specifically to catch that faint interaction and turn it into a signal — a click, a flash, an electrical pulse — every time a particle passes through it. Traditionally, this kind of equipment has been large, specialized, and expensive.",
        whyNeeded:
          "This ties the article together: the device described is exactly this kind of detector, and its significance — starting as a student project and now flying on balloons and possibly spacecraft — comes from doing the same job as bulkier detectors, cheaply and portably.",
      },
    ],
  },
];
