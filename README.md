# smolikja.team

Website of smolikja team — a small mobile product studio in Prague. A single
localized landing page (`/cs`, `/en`) that presents the offer, three delivered
applications, the working process, FAQ and an enquiry form, plus a privacy
page.

The application uses the Next.js App Router, React, TypeScript, Tailwind CSS
and pnpm. `package.json` is the source of truth for framework and dependency
versions; [`docs/stack-blueprint.md`](docs/stack-blueprint.md) explains the
intent behind them.

## Documentation

- [Architecture](docs/architecture.md) — routes, component boundaries, data
  flows and source-code ownership.
- [Localization](docs/localization.md) — typed dictionaries, adding copy or a
  locale, and locale-aware routing.
- [Contact form](docs/contact-form.md) — Server Action, abuse protection and
  the Resend delivery contract.
- [Deployment](docs/deployment.md) — standalone build, Coolify/Nixpacks
  configuration and release checks.
- [Web assets](docs/assets.md) — videos, screenshots, logo and generated icons.
- [Stack blueprint](docs/stack-blueprint.md) — the toolchain and conventions
  this project follows.
- [Stack migration](docs/stack-migration.md) — what changed in the 2026-09
  migration and why.
- [Landing page redesign plan](docs/landing-page-redesign-plan.md) and
  [pricing research](docs/landing-page-pricing-research.md) — the positioning,
  content and commercial reasoning behind the current page.

Keep durable contracts, operational procedures and non-obvious architectural
decisions in these documents. Active work belongs in the issue tracker, and
implementation details that are clear from the code should stay in the code.

## Requirements

- Node.js `>=24.0.0` (see `.nvmrc`)
- pnpm 12, pinned by the `packageManager` field in `package.json`
- Corepack, recommended for activating the pinned pnpm version

## Local development

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The bare `/` redirects to
the preferred localized route, `/cs` or `/en`.

## Environment

Local values belong in `.env.local`, which is git-ignored. Production values
are configured in Coolify.

| Variable | Production requirement | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Required for the contact form | Resend API key used server-side to deliver messages. |
| `CONTACT_FROM_EMAIL` | Required for the contact form | Sender address on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | Optional | Recipient; defaults to `siteConfig.email`. |

See [`.env.example`](.env.example) and [Contact form](docs/contact-form.md).

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Run a regular production build locally. |
| `pnpm lint` | Run ESLint. |
| `pnpm typecheck` | Run TypeScript without emitting files. |
| `pnpm test` | Run the Vitest suite once. |
| `pnpm docs:check` | Validate relative links in project Markdown files. |
| `pnpm check` | Run lint, type checking, tests and documentation validation. |

The deployed standalone server uses a different start command; see
[Deployment](docs/deployment.md).

## Architecture at a glance

- `src/app/` owns routes, layouts, metadata files and the contact Server
  Action.
- Server Components are the default. Small Client Component islands own the
  mobile menu, the FAQ accordion, the contact form and the hero entrance.
- `src/components/` is organized by subsystem (`landing`, `layout`, `icons`,
  `ui`), not by route file.
- `src/config/`, `src/i18n/` and `src/lib/` hold structural configuration,
  localization and shared server/domain logic respectively.
- `messages/` contains one typed JSON catalog per supported locale.
- `public/` contains the screenshots, logo, generated icons and the legacy
  logo videos (public URLs kept stable).

See [Architecture](docs/architecture.md) for the route map, dependency
boundaries and documentation rules.
