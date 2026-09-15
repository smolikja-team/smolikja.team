import { mainNav } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BrandLogo } from "@/components/icons/brand-logo";

export function SiteFooter({
  locale,
  copy,
  navCopy,
  languageCopy,
}: {
  locale: Locale;
  copy: Dictionary["footer"];
  navCopy: Dictionary["nav"];
  languageCopy: Dictionary["languageSwitcher"];
}) {
  return (
    <footer aria-label={copy.aria} className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <BrandLogo className="h-5 w-auto" />
          <nav aria-label={copy.navAria}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {mainNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {navCopy[item.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            {format(copy.copyright, { year: new Date().getFullYear() })} · {copy.location}
          </p>
          <LanguageSwitcher locale={locale} copy={languageCopy} label={copy.languageAria} />
        </div>
      </div>
    </footer>
  );
}
