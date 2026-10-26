import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { ownerPhotos } from "@/config/assets";
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

  // Structured data: the person behind the brand and the FAQ the page shows,
  // both localized like the page itself.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner.name,
    jobTitle: dict.hero.role,
    description: dict.meta.description,
    url: `${siteConfig.url}${localizedPathname(locale)}`,
    image: `${siteConfig.url}${ownerPhotos.portrait.src}`,
    email: siteConfig.email,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    address: { "@type": "PostalAddress", addressLocality: "Praha", addressCountry: "CZ" },
    knowsAbout: ["iOS", "Android", "Flutter", "Swift", "Kotlin", "Dart", "Product discovery"],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: dict.og.subtitle,
        serviceType: "Digital product and mobile app development",
        areaServed: ["CZ", "SK"],
      },
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <LandingPage dict={dict} locale={locale} />
    </>
  );
}
