import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import type { NavLink } from "@/lib/navigation";
import { SiteLogo } from "./site-logo";
import { CtaLink } from "./cta-link";
import { MobileMenu } from "./mobile-menu";

/**
 * Always-visible sticky header: the animated wordmark, the primary
 * destinations, the primary action and the language switch. Solid, not
 * translucent, so the page never shows through behind the links. On phones the
 * action moves into the menu (the hero and contact section repeat it) so the
 * header never overflows narrow screens.
 */
export function SiteHeader({
  homeHref,
  links,
  copy,
  languageSwitcher,
  mobileLanguageSwitcher,
}: {
  homeHref: string;
  links: NavLink[];
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
            {links.map((item) => (
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
          <CtaLink href={siteConfig.ctaHref} className="hidden h-11 px-4 text-[0.9375rem] sm:inline-flex">
            {copy.cta}
          </CtaLink>
          <div className="hidden lg:block">{languageSwitcher}</div>
          <div className="lg:hidden">
            <MobileMenu copy={copy} links={links}>
              {mobileLanguageSwitcher}
            </MobileMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
