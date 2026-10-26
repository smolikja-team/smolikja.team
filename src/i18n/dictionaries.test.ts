import { describe, expect, it } from "vitest";

import { operator } from "@/config/legal";
import { heroComposition, projects } from "@/config/projects";
import { defaultLocale, locales } from "./config";
import type { AnyProjectCopy } from "./dictionary";
import { getDictionary } from "./dictionaries";
import { format } from "./format";

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

  it.each(locales)("fills every placeholder of the operator identity in %s", async (locale) => {
    const dict = await getDictionary(locale);
    const identity = format(dict.operator.identity, operator);

    expect(identity).not.toMatch(/[{}]/);
    expect(identity).toContain(operator.ico);
    expect(dict.privacy.sections.some((section) =>
      section.paragraphs.some((paragraph) => paragraph.includes("{operator}")),
    )).toBe(true);
  });

  it.each(locales.filter((locale) => locale !== defaultLocale))(
    "keeps %s list lengths in step with the source catalog",
    async (locale) => {
      const [source, translation] = await Promise.all([
        getDictionary(defaultLocale),
        getDictionary(locale),
      ]);
      const lengths = (dict: typeof source) => ({
        entries: dict.process.entries.length,
        stages: dict.process.stages.map((stage) => stage.outputs.length),
        bio: dict.about.bio.length,
        ai: dict.about.ai.paragraphs.length,
        assurances: dict.about.assurances.items.length,
        faq: dict.faq.items.length,
      });

      expect(lengths(translation)).toEqual(lengths(source));
    },
  );
});
