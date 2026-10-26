import {
  BotIcon,
  CheckIcon,
  FileCheckIcon,
  GitBranchIcon,
  RadioTowerIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import { ContactSection } from "@/components/landing/contact-section";
import { CtaLink } from "@/components/landing/cta-link";
import { FaqSection } from "@/components/landing/faq-section";
import { FreeConsultationNote } from "@/components/landing/free-consultation-note";
import { OwnerBadge } from "@/components/landing/owner-badge";
import { Section } from "@/components/landing/section";
import { SectionHeading } from "@/components/landing/section-heading";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { localizedPrivacyPath } from "@/config/legal";
import { securityEvidenceUrl, securityPath } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { navLinks } from "@/lib/navigation";

/** Icons for the offered services, in catalog order. */
const serviceIcons = [
  ShieldCheckIcon,
  SparklesIcon,
  BotIcon,
  GitBranchIcon,
  RadioTowerIcon,
  FileCheckIcon,
] as const;

/**
 * The app-security page: the full security offer behind the landing page's
 * teaser — who it helps, what it covers, how a review runs, why this person,
 * what it is not, FAQ and an enquiry form. Like the landing page, every
 * section is at least one viewport tall so each topic gets room to breathe.
 */
export function SecurityPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.securityPage;
  const links = navLinks(locale, { onHome: false });
  const privacyHref = localizedPrivacyPath(locale);

  return (
    <>
      <SiteHeader
        homeHref={localizedPathname(locale)}
        links={links}
        copy={dict.nav}
        languageSwitcher={
          <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} paths={securityPath} />
        }
        mobileLanguageSwitcher={
          <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} paths={securityPath} />
        }
      />
      <main className="flex flex-1 flex-col">
        <section className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
            <div className="flex max-w-3xl flex-col gap-6">
              <OwnerBadge detail={dict.hero.role} eager />
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-primary">{copy.eyebrow}</p>
                <h1 className="text-[2.375rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {copy.title}
                </h1>
              </div>
              <p className="max-w-prose text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
                {copy.intro}
              </p>
              <div className="flex flex-col items-start gap-4">
                <CtaLink href={siteConfig.ctaHref}>{dict.nav.cta}</CtaLink>
                <FreeConsultationNote lead={dict.hero.freeConsultation} detail={dict.hero.reassurance} />
              </div>
              <p className="max-w-prose border-l-2 border-primary pl-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                {copy.evidence.text}{" "}
                <a
                  href={securityEvidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy.evidence.linkLabel}
                </a>
              </p>
            </div>
          </div>
        </section>

        <Section tone="tinted">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.audience.title}</h2>
              <ul className="flex flex-col gap-3">
                {copy.audience.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-pretty">
                    <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <SectionHeading title={copy.services.title} />
              <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {copy.services.items.map((item, index) => {
                  const Icon = serviceIcons[index % serviceIcons.length];
                  return (
                    <li
                      key={item.title}
                      className="flex flex-col gap-3 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-7"
                    >
                      <Icon aria-hidden="true" className="size-6 text-primary" />
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="leading-relaxed text-pretty text-muted-foreground">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Section>

        <Section>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 sm:px-6 sm:py-20">
            <SectionHeading title={copy.process.title} />
            <ol className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {copy.process.steps.map((step, index) => (
                <li key={step.title} className="flex flex-col gap-3 border-t pt-6">
                  <p className="text-sm font-medium text-muted-foreground">{index + 1}</p>
                  <h3 className="text-lg font-semibold text-balance">{step.title}</h3>
                  <p className="leading-relaxed text-pretty text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section tone="tinted">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 sm:px-6 sm:py-20">
            <SectionHeading title={copy.why.title} />
            <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.why.items.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-3 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-7"
                >
                  <h3 className="text-lg font-semibold text-balance">{item.title}</h3>
                  <p className="leading-relaxed text-pretty text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 rounded-3xl border border-foreground/15 p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{copy.limits.title}</h3>
              <p className="max-w-prose leading-relaxed text-pretty text-muted-foreground">{copy.limits.text}</p>
            </div>
          </div>
        </Section>

        <FaqSection copy={copy.faq} />
        <ContactSection
          copy={{ ...dict.contact, title: copy.contact.title, text: copy.contact.text }}
          locale={locale}
          privacyHref={privacyHref}
        />
      </main>
      <SiteFooter
        locale={locale}
        links={links}
        copy={dict.footer}
        operatorCopy={dict.operator}
        navCopy={dict.nav}
        languageCopy={dict.languageSwitcher}
        languagePaths={securityPath}
        privacyHref={privacyHref}
      />
    </>
  );
}
