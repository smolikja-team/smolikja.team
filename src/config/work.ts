/**
 * Structural data for the "work" section: real application screens and the
 * kinds of projects behind them. Neither names a client or a product — the
 * owner presents experience by type, not as a portfolio of named cases — so
 * ids and file names stay neutral too. Copy (alt text, captions, card text)
 * comes from `dict.work`.
 */

export type WorkImageId =
  | "smart-building-dashboard"
  | "smart-building-schedule"
  | "agri-ventilation"
  | "agri-sensors"
  | "habit-coach-today"
  | "habit-coach-goals"
  | "outdoor-map-detail"
  | "outdoor-map-saved";

export type WorkImage = {
  id: WorkImageId;
  src: string;
  width: number;
  height: number;
};

export type ExperienceId =
  | "smart-buildings"
  | "agriculture"
  | "startup"
  | "public-app"
  | "regulated"
  | "web-ai";

// Intrinsic pixel sizes of the PNGs in public/assets/work — all portrait
// phones at (roughly) 9:19.5. The agriculture screens are 1× exports, so the
// gallery keeps every screen at a modest width.
const size1320 = { width: 1320, height: 2868 } as const;
const size1284 = { width: 1284, height: 2778 } as const;
const size390 = { width: 390, height: 844 } as const;

function screen(id: WorkImageId, size: { width: number; height: number }): WorkImage {
  return { id, src: `/assets/work/${id}.png`, ...size };
}

const screens = {
  "smart-building-dashboard": screen("smart-building-dashboard", size1284),
  "smart-building-schedule": screen("smart-building-schedule", size1284),
  "agri-ventilation": screen("agri-ventilation", size390),
  "agri-sensors": screen("agri-sensors", size390),
  "habit-coach-today": screen("habit-coach-today", size1320),
  "habit-coach-goals": screen("habit-coach-goals", size1320),
  "outdoor-map-detail": screen("outdoor-map-detail", size1320),
  "outdoor-map-saved": screen("outdoor-map-saved", size1320),
} satisfies Record<WorkImageId, WorkImage>;

/**
 * Gallery order: screens of the same app stay together, and the visually most
 * striking apps come first.
 */
export const workGallery: readonly WorkImage[] = [
  screens["habit-coach-today"],
  screens["habit-coach-goals"],
  screens["outdoor-map-detail"],
  screens["outdoor-map-saved"],
  screens["agri-ventilation"],
  screens["agri-sensors"],
  screens["smart-building-dashboard"],
  screens["smart-building-schedule"],
];

/**
 * Kinds of projects, in display order. `tags` are technology names, identical
 * in every language, so they live here rather than in the catalogs.
 */
export const experiences: readonly { id: ExperienceId; tags: readonly string[] }[] = [
  { id: "smart-buildings", tags: ["Flutter", "Strapi", "WebSocket", "Firebase"] },
  { id: "agriculture", tags: ["Flutter", "Strapi", "WebSocket"] },
  { id: "startup", tags: ["Flutter", "App Store"] },
  { id: "public-app", tags: ["Flutter", "Strapi", "CMS"] },
  { id: "regulated", tags: ["Swift", "iOS", "Flutter"] },
  { id: "web-ai", tags: ["Next.js", "Python", "LLM"] },
];

/**
 * Hero stack: a colourful light screen in front and a dark screen from a
 * different kind of app behind it, so the opening shows range at a glance.
 */
export const heroComposition = {
  primary: screens["outdoor-map-detail"],
  secondary: screens["habit-coach-today"],
} as const;
