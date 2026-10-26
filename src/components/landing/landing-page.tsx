import { localizedPrivacyPath } from "@/config/legal";
import { localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { ProcessSection } from "./process-section";
import { ProjectsSection } from "./projects-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Composes the landing page in reading order: who and what → evidence → how
 * the collaboration runs → who exactly you work with → objections → enquiry.
 * Each section receives only the dictionary subtree it renders.
 */
export function LandingPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const privacyHref = localizedPrivacyPath(locale);

  return (
    <>
      <SiteHeader
        homeHref={localizedPathname(locale)}
        copy={dict.nav}
        languageSwitcher={<LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />}
        mobileLanguageSwitcher={
          <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />
        }
      />
      <main className="flex flex-1 flex-col">
        <Hero
          copy={dict.hero}
          cta={dict.nav.cta}
          availability={dict.availability}
          projectCopy={dict.projects.items}
        />
        <ProjectsSection copy={dict.projects} />
        <ProcessSection copy={dict.process} />
        <AboutSection copy={dict.about} />
        <FaqSection copy={dict.faq} />
        <ContactSection
          copy={dict.contact}
          availability={dict.availability}
          locale={locale}
          privacyHref={privacyHref}
        />
      </main>
      <SiteFooter
        locale={locale}
        copy={dict.footer}
        operatorCopy={dict.operator}
        navCopy={dict.nav}
        languageCopy={dict.languageSwitcher}
        privacyHref={privacyHref}
      />
    </>
  );
}
