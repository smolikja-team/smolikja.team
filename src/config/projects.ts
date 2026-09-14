import type { ProjectId, ProjectImageId } from "@/i18n/dictionary";

export type ProjectImage<P extends ProjectId = ProjectId> = {
  id: ProjectImageId[P];
  src: string;
  width: number;
  height: number;
};

export type Project<P extends ProjectId = ProjectId> = {
  id: P;
  /** Optional outbound link; its label comes from `projects.items[id].linkLabel`. */
  link?: string;
  images: readonly ProjectImage<P>[];
};

// Screenshot sizes are the intrinsic pixel sizes of the PNGs in
// public/assets/projects — all portrait phones at (roughly) 9:19.5.
const size1290 = { width: 1290, height: 2796 } as const;
const size1206 = { width: 1206, height: 2622 } as const;
const size390 = { width: 390, height: 844 } as const;
const size375 = { width: 375, height: 813 } as const;

function screenshots<P extends ProjectId>(
  project: P,
  size: { width: number; height: number },
  ids: readonly ProjectImageId[P][],
): ProjectImage<P>[] {
  return ids.map((id) => ({
    id,
    src: `/assets/projects/${project}/${id}.png`,
    ...size,
  }));
}

/** Projects in display order; copy comes from `dict.projects.items[id]`. */
export const projects: readonly { [P in ProjectId]: Project<P> }[ProjectId][] = [
  {
    id: "studanky",
    link: "#contact",
    images: screenshots("studanky", size375, [
      "map",
      "spring",
      "detail",
      "scanner",
      "report",
    ]),
  },
  {
    id: "domov",
    images: screenshots("domov", size1290, [
      "dashboard",
      "blinder",
      "heating",
      "time-regime",
    ]),
  },
  {
    id: "stable",
    images: screenshots("stable", size390, [
      "splashscreen",
      "stable-picker",
      "ventilators",
      "sail-control",
      "sensors",
      "light-control",
    ]),
  },
  {
    id: "auth-flow",
    link: "https://github.com/smolikja/flutter-auth-flow",
    images: screenshots("auth-flow", size1206, [
      "login",
      "registration",
      "confirmation",
    ]),
  },
];
