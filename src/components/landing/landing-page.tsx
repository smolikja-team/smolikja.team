import { mainNav } from "@/config/site";
import { localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { Hero, HERO_ID } from "./hero";
import { ProjectsSection } from "./projects-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { StatementSection } from "./statement-section";

/**
 * Composes the single landing page. Each section receives only the dictionary
 * subtree it renders, so client islands serialize the minimum.
 */
export function LandingPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <>
      <SiteHeader heroId={HERO_ID} homeHref={localizedPathname(locale)} copy={dict.nav}>
        <LanguageSwitcher locale={locale} copy={dict.languageSwitcher} />
      </SiteHeader>
      <main className="flex flex-1 flex-col">
        <Hero copy={dict.hero} nextHref={mainNav[0].href} />
        <StatementSection copy={dict.statement} />
        <ProjectsSection copy={dict.projects} />
        <AboutSection copy={dict.about} />
        <ContactSection copy={dict.contact} />
      </main>
      <SiteFooter
        locale={locale}
        copy={dict.footer}
        navCopy={dict.nav}
        languageCopy={dict.languageSwitcher}
      />
    </>
  );
}
