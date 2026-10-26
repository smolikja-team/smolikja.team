import type { Metadata } from "next";

import { SecurityPage } from "@/components/security/security-page";
import { ownerPhotos } from "@/config/assets";
import { securityPath } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { localeMeta, localizedPathname, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { jsonLdScript, localizedPageAlternates } from "@/lib/metadata";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/og-image";

/**
 * Shared implementation of the app-security page. Its slug differs per locale
 * (`securityPath`), so each locale has its own route folder that only accepts
 * its own locale and delegates here. The `_security` folder is private and
 * never becomes a route.
 */
export async function securityMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const copy = dict.securityPage;
  const canonical = localizedPathname(locale, securityPath[locale]);
  const title = `${copy.metaTitle} – ${siteConfig.owner.name}`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: localizedPageAlternates(securityPath),
    },
    openGraph: {
      title,
      description: copy.metaDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export async function SecurityRoute({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const copy = dict.securityPage;
  const url = `${siteConfig.url}${localizedPathname(locale, securityPath[locale])}`;

  // Structured data: the review as a service offered by the person, and the
  // FAQ this page shows.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.metaTitle,
    description: copy.metaDescription,
    url,
    serviceType: "Application security review",
    areaServed: ["CZ", "SK"],
    provider: {
      "@type": "Person",
      name: siteConfig.owner.name,
      url: `${siteConfig.url}${localizedPathname(locale)}`,
      image: `${siteConfig.url}${ownerPhotos.portrait.src}`,
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <SecurityPage dict={dict} locale={locale} />
    </>
  );
}

/** Share image for the security page: its own headline instead of the landing offer. */
export async function securityOgImageMetadata(locale: Locale) {
  const dict = await getDictionary(locale);
  return [
    {
      id: "og",
      alt: `${dict.securityPage.title} – ${siteConfig.owner.name}`,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export async function securityOgImage(locale: Locale) {
  const dict = await getDictionary(locale);
  return renderOgImage({
    title: dict.securityPage.title,
    subtitle: dict.og.subtitle,
    domain: siteConfig.url.replace("https://", ""),
  });
}
