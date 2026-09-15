import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandLogo } from "@/components/icons/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { dataProtectionAuthorityUrl, privacyEffectiveDate, privacyPath } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { isLocale, localeMeta, localizedPathname } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { languageAlternates } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return {
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
    alternates: {
      canonical: localizedPathname(locale, privacyPath),
      languages: languageAlternates(privacyPath),
    },
    robots: { index: true, follow: true },
  };
}

/**
 * What the site collects and why. Content lives in the catalogs; the operator
 * e-mail, effective date and authority link come from configuration so the
 * text never drifts from the values actually in use.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const copy = dict.privacy;
  const effectiveDate = new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    dateStyle: "long",
  }).format(new Date(privacyEffectiveDate));

  return (
    <>
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
          <Link
            href={localizedPathname(locale)}
            aria-label={dict.nav.home}
            className="flex min-h-11 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <BrandLogo className="h-5 w-auto" />
          </Link>
          <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-5 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-4xl">
            {copy.title}
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{copy.intro}</p>
          <p className="text-sm text-muted-foreground">
            {format(copy.effectiveFrom, { date: effectiveDate })}
          </p>
        </div>
        {copy.sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-pretty">
                {paragraph.includes("{email}") ? (
                  <>
                    {paragraph.split("{email}")[0]}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="rounded-sm underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {siteConfig.email}
                    </a>
                    {paragraph.split("{email}")[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          <a
            href={dataProtectionAuthorityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {dataProtectionAuthorityUrl.replace(/^https:\/\/|\/$/g, "")}
          </a>
        </p>
        <Link
          href={localizedPathname(locale)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 w-fit rounded-xl px-6 text-base")}
        >
          {copy.backHome}
        </Link>
      </main>
    </>
  );
}
