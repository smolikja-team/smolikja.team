import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { siteConfig } from "@/config/site";
import { isLocale, localeMeta, locales, localizedPathname } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { jsonLdScript, languageAlternates } from "@/lib/metadata";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  // Structured data: the studio as an organisation and the FAQ the page shows,
  // both localized like the page itself.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "smolikja",
    description: dict.meta.description,
    url: `${siteConfig.url}${localizedPathname(locale)}`,
    email: siteConfig.email,
    sameAs: [siteConfig.links.github],
    address: { "@type": "PostalAddress", addressLocality: "Praha", addressCountry: "CZ" },
    areaServed: ["CZ", "SK"],
    knowsAbout: ["iOS", "Android", "Flutter", "Swift", "Kotlin", "Dart"],
    makesOffer: {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: dict.og.subtitle, serviceType: "Mobile app development" },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <LandingPage dict={dict} locale={locale} />
    </>
  );
}
