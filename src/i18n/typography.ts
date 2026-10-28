import type { Locale } from "./config";

const NBSP = " ";

/** A spaced en or em dash: the space before it. */
const spacedDash = / ([–—])/g;

/**
 * A one-letter Czech preposition or conjunction (k, s, v, z, o, u, a, i)
 * followed by a space. The lookbehind does not consume the preceding space,
 * so a run such as "i u hotové" binds both letters.
 */
const czechOneLetterWord = /(?<=^|[\s(„])([ksvzouai]) /giu;

function typesetText(text: string, locale: Locale): string {
  const dashBound = text.replace(spacedDash, `${NBSP}$1`);
  return locale === "cs" ? dashBound.replace(czechOneLetterWord, `$1${NBSP}`) : dashBound;
}

/**
 * Applies line-breaking rules to every string of a catalog when it is
 * loaded, so `messages/*.json` stays plain text that is easy to edit:
 *
 * - a spaced dash never starts a line (the space before it becomes
 *   non-breaking), in every locale;
 * - in Czech, a one-letter preposition or conjunction never ends a line —
 *   the standard Czech typesetting rule ("v Praze", "a zabezpečit").
 */
export function typeset<T>(value: T, locale: Locale): T {
  if (typeof value === "string") return typesetText(value, locale) as T;
  if (Array.isArray(value)) return value.map((item: unknown) => typeset(item, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, typeset(item, locale)]),
    ) as T;
  }
  return value;
}
