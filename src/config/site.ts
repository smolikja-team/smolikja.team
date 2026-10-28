/**
 * Locale-independent site configuration. All user-facing copy lives in
 * `messages/*.json`; this file only holds structural data (brand, URLs, nav
 * targets, external links) that is the same in every language.
 */
export const siteConfig = {
  name: "smolikja team",
  url: "https://smolikja.team",
  /** The person behind the brand, as named on the page and in metadata. */
  owner: {
    name: "Jakub Smolík",
  },
  /** Contact address — shown on the page and used as the enquiry inbox. */
  email: "hey@smolikja.team",
  links: {
    github: "https://github.com/smolikja-team/",
    linkedin: "https://www.linkedin.com/in/smolikja",
  },
  /** Matches `--background`; browser chrome blends with the page. */
  themeColor: "#F7F9FC",
  /** Anchor every primary action leads to — an enquiry, not a booking. */
  ctaHref: "#contact",
} as const;

/**
 * Primary navigation. `id` keys into `dict.nav[id]` for the label. Most items
 * are same-page anchors on the landing page; `security` is its own page.
 * Resolve hrefs with `navLinks()` from `@/lib/navigation`.
 */
export const mainNav = [
  { id: "services", anchor: "#services" },
  { id: "experience", anchor: "#experience" },
  { id: "security", page: "security" },
  { id: "about", anchor: "#about" },
] as const;

export type NavItemId = (typeof mainNav)[number]["id"];
