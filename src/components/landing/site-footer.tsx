import { operator } from "@/config/legal";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import type { NavLink } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BrandLogo } from "@/components/icons/brand-logo";

const linkClassName =
  "inline-flex min-h-11 items-center rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50";

export function SiteFooter({
  locale,
  links,
  copy,
  operatorCopy,
  navCopy,
  languageCopy,
  languagePaths,
  privacyHref,
}: {
  locale: Locale;
  links: NavLink[];
  copy: Dictionary["footer"];
  operatorCopy: Dictionary["operator"];
  navCopy: Dictionary["nav"];
  languageCopy: Dictionary["languageSwitcher"];
  /** The current page in each locale, for pages with localized slugs. */
  languagePaths?: Record<Locale, string>;
  privacyHref: string;
}) {
  return (
    <footer aria-label={copy.aria} className="border-t bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <BrandLogo className="h-5 w-auto" />
          <nav aria-label={copy.navAria}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {links.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className={linkClassName}>
                    {navCopy[item.id]}
                  </a>
                </li>
              ))}
              <li>
                <a href={siteConfig.ctaHref} className={linkClassName}>
                  {navCopy.cta}
                </a>
              </li>
              <li>
                <a href={privacyHref} className={linkClassName}>
                  {copy.privacy}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {copy.linkedin}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <p>
            {format(copy.copyright, { year: new Date().getFullYear() })} · {copy.location} ·{" "}
            <a href={`mailto:${siteConfig.email}`} className={linkClassName}>
              {siteConfig.email}
            </a>
          </p>
          <LanguageSwitcher
            locale={locale}
            copy={languageCopy}
            label={copy.languageAria}
            paths={languagePaths}
          />
        </div>
        {/* Legal identity required on an entrepreneur's website (§ 435 Civil Code). */}
        <p className="text-xs leading-relaxed text-pretty text-muted-foreground">
          {format(operatorCopy.identity, operator)}. {operatorCopy.register}
        </p>
      </div>
    </footer>
  );
}
