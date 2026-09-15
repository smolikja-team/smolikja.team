import { describe, expect, it } from "vitest";

import { heroComposition, projects } from "@/config/projects";
import { locales } from "./config";
import type { AnyProjectCopy } from "./dictionary";
import { getDictionary } from "./dictionaries";

describe("getDictionary", () => {
  it.each(locales)("loads a catalog for %s that covers every configured project and hero screen", async (locale) => {
    const dict = await getDictionary(locale);

    for (const project of projects) {
      const copy: AnyProjectCopy = dict.projects.items[project.id];
      expect(copy.title).toBeTruthy();
      for (const image of project.images) expect(copy.images[image.id]).toBeTruthy();
    }
    for (const { project, image } of Object.values(heroComposition)) {
      const copy: AnyProjectCopy = dict.projects.items[project];
      expect(copy.images[image.id]).toBeTruthy();
    }
  });
});
