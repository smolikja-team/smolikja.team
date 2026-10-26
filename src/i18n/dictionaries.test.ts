import { describe, expect, it } from "vitest";

import { operator } from "@/config/legal";
import { serviceOrder } from "@/config/pages";
import { experiences, heroComposition, workGallery } from "@/config/work";
import { defaultLocale, locales } from "./config";
import { getDictionary } from "./dictionaries";
import { format } from "./format";

describe("getDictionary", () => {
  it.each(locales)("loads a catalog for %s that covers every work screen, experience and service", async (locale) => {
    const dict = await getDictionary(locale);

    for (const image of [...workGallery, ...Object.values(heroComposition)]) {
      expect(dict.work.images[image.id].alt).toBeTruthy();
      expect(dict.work.images[image.id].caption).toBeTruthy();
    }
    for (const { id } of experiences) expect(dict.work.experiences[id].title).toBeTruthy();
    for (const id of serviceOrder) expect(dict.services.items[id].points.length).toBeGreaterThan(0);
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
        services: serviceOrder.map((id) => dict.services.items[id].points.length),
        securityChecks: dict.security.checks.length,
        principles: dict.approach.principles.length,
        bio: dict.about.bio.length,
        ai: dict.about.ai.paragraphs.length,
        assurances: dict.about.assurances.items.length,
        faq: dict.faq.items.length,
        securityPage: {
          audience: dict.securityPage.audience.items.length,
          services: dict.securityPage.services.items.length,
          steps: dict.securityPage.process.steps.length,
          why: dict.securityPage.why.items.length,
          faq: dict.securityPage.faq.items.length,
        },
      });

      expect(lengths(translation)).toEqual(lengths(source));
    },
  );
});
