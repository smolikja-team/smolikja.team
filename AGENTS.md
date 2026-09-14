# Repository Guidelines

## Project Structure & Module Organization
- `src/app` holds the Next.js App Router layouts, routes, and metadata definitions; treat each route segment as an isolated feature module.
- `src/components` provides reusable UI pieces; prefer colocating story or example usage inside the component folder when adding new widgets.
- `src/lib` contains shared utilities (API helpers, config loaders); keep functions pure and export named helpers.
- `src/types` centralizes TypeScript contracts that cross module boundaries.
- `public` exposes static assets, while `deploy/` stores shell scripts for local and production deployments.

## Build, Test, and Development Commands
- `npm run dev` starts the dev server with Turbopack hot reload.
- `npm run build` produces the production bundle; pair with `npm start` for SSR smoke tests.
- `npm run export` plus `./deploy/deploy-static.sh` creates and ships the static site.
- `npm run lint` / `npm run lint:fix` enforce ESLint's Next.js + TypeScript rules.
- `npm run type-check` ensures the project stays type-safe; run it before handing off major changes.
- `npm run build:analyze` enables the bundle analyzer for regression checks.

## Coding Style & Naming Conventions
- Follow the existing 2-space indentation and double-quoted strings in `.ts(x)` files.
- Components and Hooks use `PascalCase` and `useCamelCase` respectively; utility functions prefer `camelCase`.
- Tailwind CSS is the default styling approach; keep global overrides in `src/app/globals.css` minimal.
- Run ESLint after sizeable refactors to confirm alignment with the flat config in `eslint.config.mjs`.

## Testing Guidelines
- Automated UI tests are not yet configured; rely on `npm run lint`, `npm run type-check`, and visual QA via `npm run dev`.
- For new automated coverage, colocate specs as `ComponentName.test.tsx` under the relevant folder and document any new tooling in `docs/`.
- Use `deploy/test-local.sh` when validating deployment scripts or CDN artifacts.

## Commit & Pull Request Guidelines
- Follow the Conventional Commits pattern already in history (e.g., `feat: hero video preload`, `fix: safari padding`).
- Keep commits focused and staged with `npm run build` and lint/type checks passing.
- Pull requests should link related issues, summarize UI or behavior changes, and capture before/after screenshots when styling shifts.
