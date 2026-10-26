import type { Locale } from "@/i18n/config";

/** Path of the privacy page under each locale prefix. */
export const privacyPath = "/privacy";

export function localizedPrivacyPath(locale: Locale): string {
  return `/${locale}${privacyPath}`;
}

/**
 * ISO date the current privacy text took effect; localized at render time.
 * Bump together with any change to what the site collects or how.
 */
export const privacyEffectiveDate = "2026-10-08";

/**
 * Operator identity as recorded in the trade register (ARES), which § 435 of
 * the Czech Civil Code requires on an entrepreneur's website. Rendered through
 * the `operator` templates in the catalogs.
 */
export const operator = {
  name: "Ing. Jakub Smolík",
  ico: "21712107",
  address: "č. p. 50, 591 01 Vysoké",
} as const;

/** Supervisory authority for personal-data complaints in the Czech Republic. */
export const dataProtectionAuthorityUrl = "https://uoou.gov.cz/";
