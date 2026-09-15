import { localizedPrivacyPath } from "@/config/legal";
import { localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ContactSection } from "./contact-section";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { ProcessSection } from "./process-section";
import { ProjectsSection } from "./projects-section";
import { ScopeSection } from "./scope-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TeamSection } from "./team-section";

/**
 * Composes the landing page in reading order: offer → evidence → how we work
 * → the complete product → the team → objections → enquiry. Each section
 * receives only the dictionary subtree it renders.
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
        <Hero copy={dict.hero} cta={dict.nav.cta} projectCopy={dict.projects.items} />
        <ProjectsSection copy={dict.projects} />
        <ProcessSection copy={dict.process} />
        <ScopeSection copy={dict.scope} />
        <TeamSection copy={dict.team} />
        <FaqSection copy={dict.faq} />
        <ContactSection copy={dict.contact} locale={locale} privacyHref={privacyHref} />
      </main>
      <SiteFooter
        locale={locale}
        copy={dict.footer}
        navCopy={dict.nav}
        languageCopy={dict.languageSwitcher}
        privacyHref={privacyHref}
      />
    </>
  );
}
