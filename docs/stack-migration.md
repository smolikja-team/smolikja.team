# Stack migration (2026-09)

Decision record for the move from the original Next.js 15 / npm / hand-written
CSS site to the stack described in [`stack-blueprint.md`](stack-blueprint.md).
The pre-migration state is preserved in git history (commit `ba849ba` and
earlier); this document keeps only the decisions that are not obvious from the
code.

## What changed

| Area | Before | After |
| --- | --- | --- |
| Toolchain | npm, TypeScript 5.8, ESLint via `FlatCompat`, no tests | pnpm 12 via Corepack, Node 24, TypeScript 6, ESLint 9 flat, Vitest 5, `pnpm check` gate |
| Framework | Next 15.3, everything under `page.tsx` was a Client Component | Next 16.3, Server Components by default, five small client islands |
| i18n | Client-side toggle stored in `localStorage`; server always rendered Czech; copy inline in components | Always-prefixed `/cs`, `/en` with `src/proxy.ts`; typed JSON catalogs; correct `<html lang>`, canonical and hreflang per locale |
| Styling | 1 670 lines of BEM-ish CSS, Tailwind imported but unused | shadcn `base-nova` on Base UI, Tailwind v4 semantic tokens, generated primitives |
| Assets | Fetched from the external `smolikja.team/assets` host | Committed under `public/assets/**` at the same paths |
| Metadata | Static `metadata` with keyword lists, non-standard `ai:*`/`schema:*` meta, placeholder verification codes; hand-written `robots.txt`/`sitemap.xml` listing routes that never existed | `generateMetadata` per locale, `robots.ts`, `sitemap.ts`, `manifest.ts`, generated OG image, Organization JSON-LD |
| Mutations | none (mailto only) | Contact form: Server Action + Zod 4 + honeypot + rate limit, delivered through Resend |
| Deploy | Static export to nginx or PM2 scripts with stale paths | Coolify + Nixpacks standalone server |

## Decisions

- **Server rendering replaces static export.** Locale negotiation and the
  contact form need a server; the `deploy/` scripts and `NEXT_OUTPUT_MODE`
  switch were removed rather than kept as a second, untested path.
- **URLs changed to `/cs` and `/en`.** The bare `/` redirects and is the
  `x-default` hreflang target. Old deep links did not exist (single page), so
  nothing else needed redirects.
- **Assets live in the repository** (≈ 71 MB, mostly the four video encodes).
  Paths under `/assets/*` were kept so anything referencing them externally
  keeps working. The 2160p encode is now only served to 4K/5K displays;
  previously every desktop received it.
- **`cn()` comes from the `cn` package**, not `clsx` + `tailwind-merge` as in
  the blueprint. The shadcn registry moved to its own compiled merger after
  the blueprint snapshot and every generated primitive imports it; fighting
  the generator on each `add` was not worth it. `@/lib/utils` re-exports it so
  application code keeps the blueprint's import path.
- **Design.** One typeface (Instrument Sans, `latin-ext`) instead of Geist,
  chosen for the site rather than inherited from the sister project. True
  black background because the hero video is rendered on black. A single
  chromatic token (`--brand`, Discord blurple) reserved for the community CTA.
  The scroll-snap page layout was dropped: it fought the sticky header and the
  form, and was already disabled in Safari. The custom draggable gallery
  scrollbar was replaced by native scrolling plus previous/next buttons.
  `Reveal` is used once (the statement) rather than on every section.
- **Contact delivery through Resend** (plain `fetch`, no SDK) because the
  site has no backend of its own; the transport is isolated in
  `src/lib/contact-mail.ts` so it can be swapped.
- **Dropped without replacement:** the unused `NEXT_PUBLIC_GA_ID`, the
  placeholder Google/Bing verification codes, the ~60-entry `keywords` list,
  the `ai:*` / `schema:*` / `contact:*` meta tags (no consumer reads them; the
  JSON-LD carries the structured data), `SafariDetection`, `dev-utils` and the
  stale `APP_CONFIG.version`.
