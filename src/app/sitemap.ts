import type { MetadataRoute } from "next";

import { privacyPath } from "@/config/legal";
import { securityPath } from "@/config/pages";
import { siteConfig } from "@/config/site";
import {
  defaultLocale,
  localeMeta,
  locales,
  localizedPathname,
  type Locale,
} from "@/i18n/config";

// Bump when page content changes meaningfully.
const lastModified = new Date("2026-10-28T00:00:00.000Z");

function absoluteUrl(locale: Locale, pathname = "/"): string {
  return `${siteConfig.url}${localizedPathname(locale, pathname)}`;
}

function alternates(pathname = "/"): Record<string, string> {
  // Shared hreflang map attached to every entry: each locale + an `x-default`
  // pointing at the redirecting unprefixed path.
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeMeta[locale].hrefLang] = absoluteUrl(locale, pathname);
  }
  languages["x-default"] = `${siteConfig.url}${pathname === "/" ? "" : pathname}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: absoluteUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages: alternates() },
  }));

  const privacy: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: absoluteUrl(locale, privacyPath),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: { languages: alternates(privacyPath) },
  }));

  // The security page has a different slug per locale, so its hreflang map is
  // built from `securityPath`; `x-default` points at the default locale's page.
  const securityLanguages: Record<string, string> = {};
  for (const locale of locales) {
    securityLanguages[localeMeta[locale].hrefLang] = absoluteUrl(locale, securityPath[locale]);
  }
  securityLanguages["x-default"] = absoluteUrl(defaultLocale, securityPath[defaultLocale]);

  const security: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: absoluteUrl(locale, securityPath[locale]),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 0.9 : 0.8,
    alternates: { languages: securityLanguages },
  }));

  return [...home, ...security, ...privacy];
}
