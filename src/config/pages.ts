import type { Locale } from "@/i18n/config";
import type { ServiceId } from "@/i18n/dictionary";

/**
 * Localized path of the app-security page under each locale prefix. The slugs
 * differ per language because they are part of what people search for.
 */
export const securityPath: Record<Locale, string> = {
  cs: "/bezpecnost-aplikaci",
  en: "/app-security",
};

/** Source of the one statistic quoted on the app-security page. */
export const securityEvidenceUrl =
  "https://sdtimes.com/agentic-security/veracode-finds-ai-generated-code-security-has-barely-improved-since-last-year/";

/** Display order of the four service cards; copy is `dict.services.items[id]`. */
export const serviceOrder: readonly ServiceId[] = ["plan", "build", "secure", "grow"];
