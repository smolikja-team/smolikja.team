import { experiences, workGallery } from "@/config/work";

import type { Locale } from "./config";
import type { Dictionary, DictionaryCatalog } from "./dictionary";
import { typeset } from "./typography";

/**
 * Runtime cross-check between structural data and copy: every screen and
 * every kind of project declared in `src/config/work.ts` must have its copy
 * in the catalog. The type system guarantees the reverse direction (the
 * catalog cannot name a screen or experience the type does not know).
 * The checked catalog is then typeset for its locale (`typeset`).
 */
function normalizeDictionary(catalog: DictionaryCatalog, locale: Locale): Dictionary {
  for (const image of workGallery) {
    if (!catalog.work.images[image.id]?.alt) {
      throw new Error(`Missing alt text for work screen "${image.id}".`);
    }
  }
  for (const experience of experiences) {
    if (!catalog.work.experiences[experience.id]) {
      throw new Error(`Missing copy for experience "${experience.id}".`);
    }
  }

  return typeset(catalog, locale);
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
      normalizeDictionary(m.default as DictionaryCatalog, "cs"),
    ),
  en: () =>
    import("../../messages/en.json").then((m) =>
      normalizeDictionary(m.default as DictionaryCatalog, "en"),
    ),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
