/**
 * Locale-independent site configuration. All user-facing copy lives in
 * `messages/*.json`; this file only holds structural data (brand, URLs, nav
 * targets, external links) that is the same in every language.
 */
export const siteConfig = {
  name: "smolikja team",
  url: "https://smolikja.team",
  /** Team contact address — shown on the page and used as the enquiry inbox. */
  email: "smolikja@protonmail.com",
  links: {
    github: "https://github.com/smolikja-team/",
  },
  /** Matches `--background`; browser chrome blends with the page. */
  themeColor: "#F7F9FC",
  /** Anchor every primary action leads to — an enquiry, not a booking. */
  ctaHref: "#contact",
} as const;

/**
 * Primary navigation. `id` keys into `dict.nav[id]` for the label; `href` is a
 * same-page anchor and identical across locales.
 */
export const mainNav = [
  { id: "projects", href: "#projects" },
  { id: "process", href: "#process" },
  { id: "about", href: "#about" },
] as const;

export type NavItemId = (typeof mainNav)[number]["id"];
