import { mainNav, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { SiteLogo } from "./site-logo";
import { CtaLink } from "./cta-link";
import { MobileMenu } from "./mobile-menu";

/**
 * Always-visible sticky header: the animated wordmark, three destinations,
 * the primary action and the language switch. Solid, not translucent: the
 * wordmark video is blended onto the header surface, and only an opaque
 * surface lets its black frame disappear completely.
 */
export function SiteHeader({
  homeHref,
  copy,
  languageSwitcher,
  mobileLanguageSwitcher,
}: {
  homeHref: string;
  copy: Dictionary["nav"];
  languageSwitcher: React.ReactNode;
  mobileLanguageSwitcher: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6">
        <a
          href={homeHref}
          aria-label={copy.home}
          className="flex min-h-11 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <SiteLogo />
        </a>
        <nav aria-label={copy.aria} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-lg px-3 text-[0.9375rem] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
          <CtaLink href={siteConfig.ctaHref} className="h-11 px-4 text-[0.9375rem]">
            {copy.cta}
          </CtaLink>
          <div className="hidden lg:block">{languageSwitcher}</div>
          <div className="lg:hidden">
            <MobileMenu copy={copy}>{mobileLanguageSwitcher}</MobileMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
