import { localizedPrivacyPath } from "@/config/legal";
import { securityPath } from "@/config/pages";
import { localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { navLinks } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AboutSection, AiAgentsSection, AssurancesSection } from "./about-section";
import { ApproachSection } from "./approach-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { SecuritySection } from "./security-section";
import { ServicesSection } from "./services-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WorkSection } from "./work-section";

/**
 * Composes the landing page in reading order, one topic per screen: who and
 * what → the four services → my work (gallery) → experience → security → how
 * a collaboration runs → who I am → working with AI agents → what you can
 * count on → objections → enquiry. Section backgrounds alternate (the hero
 * is plain, then tinted, plain, …). Each section receives only the
 * dictionary subtree it renders.
 */
export function LandingPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const privacyHref = localizedPrivacyPath(locale);
  const securityHref = localizedPathname(locale, securityPath[locale]);
  const links = navLinks(locale, { onHome: true });

  return (
    <>
      <SiteHeader
        homeHref={localizedPathname(locale)}
        links={links}
        copy={dict.nav}
        languageSwitcher={<LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />}
        mobileLanguageSwitcher={
          <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />
        }
      />
      <main className="flex flex-1 flex-col">
        <Hero copy={dict.hero} cta={dict.nav.cta} screens={dict.work.images} />
        <ServicesSection copy={dict.services} securityHref={securityHref} />
        <WorkSection copy={dict.work} />
        <ExperienceSection copy={dict.work} />
        <SecuritySection copy={dict.security} securityHref={securityHref} />
        <ApproachSection copy={dict.approach} />
        <AboutSection copy={dict.about} />
        <AiAgentsSection copy={dict.about.ai} />
        <AssurancesSection copy={dict.about.assurances} />
        <FaqSection copy={dict.faq} tone="tinted" />
        <ContactSection
          copy={dict.contact}
          locale={locale}
          privacyHref={privacyHref}
          tone="default"
        />
      </main>
      <SiteFooter
        locale={locale}
        links={links}
        copy={dict.footer}
        operatorCopy={dict.operator}
        navCopy={dict.nav}
        languageCopy={dict.languageSwitcher}
        privacyHref={privacyHref}
      />
    </>
  );
}
