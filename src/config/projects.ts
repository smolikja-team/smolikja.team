import type { ProjectId, ProjectImageId, ProjectStatus } from "@/i18n/dictionary";

export type ProjectImage<P extends ProjectId = ProjectId> = {
  id: ProjectImageId[P];
  src: string;
  width: number;
  height: number;
};

export type Project<P extends ProjectId = ProjectId> = {
  id: P;
  /** Lifecycle stage — independent of who delivers the app. */
  status: ProjectStatus;
  /** Screens shown in the case story, in reading order (2–3, no carousel). */
  images: readonly ProjectImage<P>[];
};

// Screenshot sizes are the intrinsic pixel sizes of the PNGs in
// public/assets/projects — all portrait phones at (roughly) 9:19.5.
// Studánky and Stable sources are 1× exports; keep them at modest display
// sizes rather than upscaling.
const size1290 = { width: 1290, height: 2796 } as const;
const size390 = { width: 390, height: 844 } as const;
const size375 = { width: 375, height: 813 } as const;

function screenshot<P extends ProjectId>(
  project: P,
  id: ProjectImageId[P],
  size: { width: number; height: number },
): ProjectImage<P> {
  return { id, src: `/assets/projects/${project}/${id}.png`, ...size };
}

/** Application deliveries in display order; copy comes from `dict.projects.items[id]`. */
export const projects: readonly { [P in ProjectId]: Project<P> }[ProjectId][] = [
  {
    id: "domov",
    status: "delivered",
    images: [
      screenshot("domov", "blinder", size1290),
      screenshot("domov", "time-regime", size1290),
    ],
  },
  {
    id: "stable",
    status: "delivered",
    images: [
      screenshot("stable", "sensors", size390),
      screenshot("stable", "ventilators", size390),
    ],
  },
  {
    id: "studanky",
    status: "in-development",
    images: [
      screenshot("studanky", "map", size375),
      screenshot("studanky", "detail", size375),
      screenshot("studanky", "report", size375),
    ],
  },
];

/**
 * Hero composition: one large real screen (the highest-resolution source; the
 * weekly schedule is a full screen rather than a sheet over a dimmed
 * dashboard) and one smaller supporting screen from a different product. Alt
 * text comes from the owning project's copy.
 */
export const heroComposition = {
  primary: { project: "domov", image: screenshot("domov", "time-regime", size1290) },
  secondary: { project: "studanky", image: screenshot("studanky", "spring", size375) },
} as const;
