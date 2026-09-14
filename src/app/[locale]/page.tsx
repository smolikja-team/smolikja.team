import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { siteConfig } from "@/config/site";
import { isLocale, localeMeta, locales, localizedPathname } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * hreflang map for `alternates.languages`. Each locale points at its prefixed
 * URL (`/cs`, `/en`); `x-default` points at the bare `/`, which the proxy
 * redirects to the visitor's best locale — the pattern Google recommends for a
 * language-agnostic entry point.
 */
function languageAlternates(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeMeta[locale].hrefLang] = localizedPathname(locale);
  }
  languages["x-default"] = "/";
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const canonical = localizedPathname(locale);

  return {
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeMeta[l].ogLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** Serializes JSON-LD safely for a native <script> tag (escapes `<` per docs). */
function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  // Structured data: the organisation behind the site, localized like the page.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "smolikja",
    description: dict.meta.description,
    url: `${siteConfig.url}${localizedPathname(locale)}`,
    email: siteConfig.email,
    sameAs: [siteConfig.links.github, siteConfig.links.discord],
    address: { "@type": "PostalAddress", addressLocality: "Praha", addressCountry: "CZ" },
    knowsAbout: ["iOS", "Android", "Flutter", "Swift", "Kotlin", "Dart"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
      />
      <LandingPage dict={dict} locale={locale} />
    </>
  );
}
