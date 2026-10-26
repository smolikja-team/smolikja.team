# Localization

The site uses always-prefixed content URLs and typed JSON message catalogs.
All user-facing copy, including accessible names and image alternative text,
lives in `messages/<locale>.json`.

## Sources of truth

- `src/i18n/config.ts` defines supported locales, locale metadata, the default
  fallback and `Accept-Language` matching.
- `src/i18n/dictionary.ts` defines the complete `Dictionary` shape, including
  the project and screenshot ids that catalogs must cover.
- `src/i18n/dictionaries.ts` lazily loads catalogs for Server Components and
  cross-checks them against `src/config/projects.ts`.
- `messages/validate.ts` makes TypeScript validate every catalog at compile
  time.
- `src/i18n/format.ts` renders strings containing `{placeholder}` tokens.

Only localized prose belongs in catalogs. URLs, ids, image paths and other
locale-independent structure belong in `src/config/` or the component that
owns the behaviour. Brand names, protocol values and the hidden honeypot
field name are structural data rather than translated copy.

## Add or change copy

1. Add or change the key in the `Dictionary` type.
2. Update the same key in every `messages/*.json` catalog.
3. Pass the smallest relevant dictionary subtree from the Server Component to
   the component that renders it.
4. Render template placeholders with `format()` rather than manual replacement.
5. Run `pnpm typecheck`; a missing, misspelled or structurally incompatible key
   fails in `messages/validate.ts`.

Do not hardcode visible strings, `aria-label` values or `alt` text in
components.

## Add a project

1. Add the project id and its screenshot ids to `ProjectId` / `ProjectImageId`
   in `src/i18n/dictionary.ts`.
2. Put the PNGs under `public/assets/projects/<id>/` and register the two or
   three screens the story shows, with their intrinsic pixel size and the
   project's lifecycle `status`, in `src/config/projects.ts`.
3. Add `projects.items.<id>` to every catalog: `title`, `tagline`, then the
   story in four paragraphs — `problem` (situation and users), `delivered`
   (what the team was responsible for), `decision` (one meaningful product
   decision) and `result` (verifiable outcome or accurate stage) — plus one
   `images` entry per screenshot.

Write every story with smolikja as the delivering team; the shared
`projects.credit` line is added automatically and `projects.status` supplies
the stage label. The type system rejects a catalog that names unknown ids; the
loader rejects a configured project or screenshot without copy.

## Add a locale

1. Add the locale to `locales` and its HTML, Open Graph and `hreflang`
   metadata to `localeMeta` in `src/i18n/config.ts`.
2. Add `messages/<locale>.json` with the complete `Dictionary` shape.
3. Register the catalog in `src/i18n/dictionaries.ts` and
   `messages/validate.ts`.
4. Run `pnpm check` and `pnpm build` to verify catalog typing and generated
   routes.

Static params, canonical and alternate metadata, the sitemap, the language
switcher and proxy matching derive from the locale configuration. They should
not maintain separate locale lists.

## Voice

Customer-facing copy speaks as Jakub Smolík — first-person singular, masculine
forms ("pomůžu", "postavil jsem", "starám se") with consistent formal address
in Czech; English uses "I". There is no supplier "we"; a joint "we" for the
client and Jakub together ("domluvíme se") is fine. Czech is the editorial
source of truth; English carries the same intent. Keep promises to what he
actually does: no headcount, capacity numbers, response deadlines, prices or
guarantees. See the [solo positioning plan](solo-positioning-plan.md) for
vocabulary, including how AI agents are described. The one primary action is
`nav.cta` and reads the same wherever it appears.

## Routing and language negotiation

Localized content always has a prefix: `/cs` and `/en`. The bare `/` and any
unprefixed localizable path redirect according to this order:

1. A valid `NEXT_LOCALE` preference cookie.
2. The best supported `Accept-Language` value (q-values honoured, tags
   canonicalized, at most 20 entries parsed).
3. `defaultLocale`.

Visiting a prefixed URL (re)sets the cookie for one year, which is how the
language switcher's plain links persist the choice. On prefixed paths the
proxy also forwards the locale as the `x-locale` request header so the global
404 can localize itself to match the URL.

Keep `src/proxy.ts` in `src/` beside the App Router. Moving it to the
repository root would prevent this project layout from applying the proxy
convention.
