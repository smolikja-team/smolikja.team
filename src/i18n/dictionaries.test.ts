import { describe, expect, it } from "vitest";

import { projects } from "@/config/projects";
import { locales } from "./config";
import { getDictionary } from "./dictionaries";

describe("getDictionary", () => {
  it.each(locales)("loads a catalog for %s that covers every configured project", async (locale) => {
    const dict = await getDictionary(locale);

    for (const project of projects) {
      const copy = dict.projects.items[project.id];
      expect(copy.title).toBeTruthy();
      expect(Object.keys(copy.images).sort()).toEqual(project.images.map((i) => i.id).sort());
      if (project.link) expect(copy.linkLabel).toBeTruthy();
    }
  });
});
