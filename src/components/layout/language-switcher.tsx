import Link from "next/link";

import { cn } from "@/lib/utils";
import { locales, localeMeta, localizedPathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * Locale links under the always-prefixed scheme. Visiting `/en` makes the
 * proxy remember the choice in the `NEXT_LOCALE` cookie, so no client state
 * is needed here and the switcher works without JavaScript.
 */
export function LanguageSwitcher({
  locale,
  copy,
  className,
}: {
  locale: Locale;
  copy: Dictionary["languageSwitcher"];
  className?: string;
}) {
  return (
    <nav aria-label={copy.label} className={className}>
      <ul className="flex items-center gap-1 text-sm">
        {locales.map((candidate) => {
          const current = candidate === locale;
          return (
            <li key={candidate}>
              <Link
                href={localizedPathname(candidate)}
                hrefLang={localeMeta[candidate].htmlLang}
                lang={localeMeta[candidate].htmlLang}
                aria-label={copy[candidate]}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-medium uppercase transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  current
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {candidate}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
