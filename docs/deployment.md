# Deployment

Production is self-hosted through Coolify using Nixpacks and the Next.js
standalone server output. The committed configuration files are authoritative;
this document explains how they fit together and what to verify around a
release.

## Build and runtime

`next.config.ts` enables `output: "standalone"`. `nixpacks.toml`:

1. installs Node.js 24;
2. activates the pnpm version pinned in `package.json` through Corepack;
3. installs dependencies with the frozen lockfile;
4. runs `pnpm build`;
5. copies `public/` and `.next/static/` into the standalone output; and
6. starts `node .next/standalone/server.js` on `0.0.0.0:3000`.

The copies in step 5 are required because Next.js does not include those asset
directories in standalone output automatically. `pnpm start` remains useful for
testing a regular production build locally, but it is not the deployed start
command.

The pnpm version in `nixpacks.toml` (`corepack prepare pnpm@…`) must equal the
`packageManager` field in `package.json`; otherwise Corepack aborts the build.
Bump both together.

Coolify settings:

| Setting | Value |
| --- | --- |
| Build pack | Nixpacks |
| Build / start command | Not set in Coolify — they come from `nixpacks.toml` |
| Exposed port | `3000` |
| Static site | Disabled |
| Health check | Coolify default container check (there is no `/health` route) |
| Runtime environment | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (and optionally `CONTACT_TO_EMAIL`) |

The deployment relies on process-local contact-form rate limiting. Before
running multiple web replicas, add shared rate limiting so behaviour does not
vary by instance.

## Environment

See [Contact form](contact-form.md) for the variables and their failure
modes. Local development copies `.env.example` to the git-ignored
`.env.local`; production values are configured in Coolify and never committed.

## Pre-deploy checks

1. Install from the committed lockfile and run:

   ```bash
   pnpm check
   pnpm build
   ```

2. Confirm the contact-form variables are present in the target environment
   and the sender domain is verified in Resend.
3. Review `src/config/site.ts` for the canonical site URL, e-mail and external
   links.
4. If page content changed meaningfully, bump `lastModified` in
   `src/app/sitemap.ts`.

## Post-deploy checks

- `/` redirects to a supported locale; `/cs` and `/en` render.
- An unknown path such as `/cs/nothing` returns a localized 404 with status
  `404`.
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/icon.png` and
  `/cs/opengraph-image/og` respond with `200`.
- `/assets/logo-3d/team-logo.glb` and a project screenshot are served
  directly (no redirect).
- Submit a contact message and confirm it arrives with the visitor's address
  as `Reply-To`.
- Security headers from `next.config.ts` are present
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).

## History

Until 2026-09 the site was deployed as a static export behind nginx (or as a
PM2 process). Static export is no longer possible: locale negotiation runs in
`src/proxy.ts` and the contact form is a Server Action, both of which need a
server.
