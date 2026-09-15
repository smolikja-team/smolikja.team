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
export const privacyEffectiveDate = "2026-09-15";

/** Supervisory authority for personal-data complaints in the Czech Republic. */
export const dataProtectionAuthorityUrl = "https://uoou.gov.cz/";
