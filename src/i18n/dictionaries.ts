import { projects } from "@/config/projects";

import type { Locale } from "./config";
import type { Dictionary, DictionaryCatalog } from "./dictionary";

/**
 * Runtime cross-check between structural data and copy: every project and
 * every screenshot declared in `src/config/projects.ts` must have its copy in
 * the catalog. The type system guarantees the reverse direction (the catalog
 * cannot name a project or image the type does not know).
 */
function normalizeDictionary(catalog: DictionaryCatalog): Dictionary {
  for (const project of projects) {
    const copy = catalog.projects.items[project.id];
    if (!copy) throw new Error(`Missing copy for project "${project.id}".`);
    if (project.link && !copy.linkLabel) {
      throw new Error(`Project "${project.id}" has a link but no linkLabel.`);
    }
    for (const image of project.images) {
      if (!(image.id in copy.images)) {
        throw new Error(`Missing alt text for "${project.id}/${image.id}".`);
      }
    }
  }

  return catalog;
}

/**
 * Lazily loads a translation catalog for the given locale. Catalogs are plain
 * JSON so they can later be handed to a translation-management system; the cast
 * is validated at compile time by `messages/validate.ts`.
 *
 * Because this only runs in Server Components, the JSON never reaches the client
 * bundle — only the rendered HTML does.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  cs: () =>
    import("../../messages/cs.json").then((m) =>
      normalizeDictionary(m.default as DictionaryCatalog),
    ),
  en: () =>
    import("../../messages/en.json").then((m) =>
      normalizeDictionary(m.default as DictionaryCatalog),
    ),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
