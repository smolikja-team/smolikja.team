import { securityPath } from "@/config/pages";
import { mainNav, type NavItemId } from "@/config/site";
import { localizedPathname, type Locale } from "@/i18n/config";

export type NavLink = { id: NavItemId; href: string };

/**
 * Resolves the primary navigation for one page. Anchors stay bare on the
 * landing page (smooth in-page jumps) and point back to it everywhere else;
 * page items resolve to their localized path.
 */
export function navLinks(locale: Locale, { onHome }: { onHome: boolean }): NavLink[] {
  const home = localizedPathname(locale);

  return mainNav.map((item) => {
    if ("page" in item) {
      return { id: item.id, href: localizedPathname(locale, securityPath[locale]) };
    }
    return { id: item.id, href: onHome ? item.anchor : `${home}${item.anchor}` };
  });
}
