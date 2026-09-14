/**
 * Locale-independent site configuration. All user-facing copy lives in
 * `messages/*.json`; this file only holds structural data (brand, URLs, nav
 * targets, external links) that is the same in every language.
 */
export const siteConfig = {
  name: "smolikja team",
  url: "https://smolikja.team",
  email: "smolikja@protonmail.com",
  links: {
    github: "https://github.com/smolikja-team/",
    discord: "https://discord.gg/jrnAaFeEzu",
    venue: "https://sklad.digital/",
  },
  themeColor: "#000000",
} as const;

/**
 * Primary navigation. `id` keys into `dict.nav[id]` for the label; `href` is a
 * same-page anchor and identical across locales.
 */
export const mainNav = [
  { id: "projects", href: "#projects" },
  { id: "about", href: "#about" },
  { id: "contact", href: "#contact" },
] as const;

export type NavItemId = (typeof mainNav)[number]["id"];
