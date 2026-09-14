# Migrace stacku – 1. Analýza současného stavu

Stav k 2026-09-14, branch `feature/redesign_v2` (commit `ba849ba`, shodný s `main`).

## 1. Runtime & toolchain (současný)

| Oblast | Současný stav | Poznámka |
| --- | --- | --- |
| Node | bez `.nvmrc`, bez `engines` | lokálně Node 24.21.0 |
| Package manager | **npm** (`package-lock.json`, 219 kB) | pnpm 10.33.2 + Corepack 0.36 jsou lokálně k dispozici, ale projekt je nepoužívá |
| TypeScript | 5.8.3, `target: ES2017`, `moduleResolution: bundler`, `strict: true` | `include` obsahuje mrtvé `out/types/**` |
| ESLint | 9.27 flat config, ale přes `FlatCompat` + `eslint-config-next@15.3.2`, spouštěno `next lint` | `next lint` je v Next 16 odstraněn; `@eslint/eslintrc` je jen kvůli shimu |
| Tailwind | 4.1.8 přes `@tailwindcss/postcss` | přežívá `tailwind.config.ts` ve stylu v3 (nepoužitý, content globy míří do neexistujících složek) |
| Testy | žádné | |
| CI / hooks / formatter | žádné (žádný Prettier, lint-staged, GitHub Actions) | |
| Bundle analyzer | `@next/bundle-analyzer@15.3.3` přes `require()` v ESM `next.config.ts` | |

## 2. Závislosti (současné)

| Balíček | Verze (lock) | Role | Osud při migraci |
| --- | --- | --- | --- |
| `next` | 15.3.2 | framework, App Router | upgrade na cílovou verzi |
| `react`, `react-dom` | 19.1.0 | UI runtime | upgrade na cílovou verzi |
| `typescript` | 5.8.3 | typy | → TS 6 |
| `eslint` | 9.27.0 | lint | zůstává 9.x, nová flat config bez `FlatCompat` |
| `eslint-config-next` | 15.3.2 | Next lint pravidla | upgrade + použití flat exportu |
| `@eslint/eslintrc` | 3.3.1 | jen `FlatCompat` shim | **odstranit** |
| `tailwindcss`, `@tailwindcss/postcss` | 4.1.8 | styling | zůstává 4.x, upgrade |
| `@next/bundle-analyzer` | 15.3.3 | analýza bundlu | dle cílového seznamu (pravděpodobně odstranit) |
| `@types/node` | 20.17 | typy Node | → `@types/node@24` |
| `@types/react`, `@types/react-dom` | 19 | typy React | upgrade |

Tři runtime závislosti, deset dev závislostí. Žádný shadcn, `cn()`, `cva`, Zod, Vitest.

## 3. Architektura aplikace

```
src/
├── app/            layout.tsx (obří statická metadata + inline JSON-LD), page.tsx, globals.css (1 670 řádků), favicon.ico
├── components/     FloatingLanguageSwitcher, LanguageSwitcher, SafariDetection (nepoužito), providers/LanguageProvider
│   └── sections/   IntroSection (276 ř.), ProjectsSection (465 ř.), AboutSection (168 ř.)
├── lib/            constants.ts, dev-utils.ts (nepoužito), i18n.ts, projects.ts (data), utils.ts (detekce prohlížeče)
└── types/          index.ts
public/             manifest.json, robots.txt, sitemap.xml
deploy/             nginx-static.conf, nginx-proxy.conf, deploy-static.sh, deploy-proxy.sh, portfolio-web.service, test-local.sh
scripts/            export-build.cjs (NEXT_OUTPUT_MODE=export next build)
```

### Routing a rendering
- Jediná route `/`. `layout.tsx` je RSC, ale **vše pod `page.tsx` je `'use client'`** (LanguageProvider → všechny sekce). Obsah (texty, projekty) se tedy posílá jako JS bundle a server renderuje vždy `cs`; přepnutí na `en` probíhá až po hydrataci z `localStorage`/`navigator.language` → flash obsahu, crawler vidí jen češtinu.
- `<html lang="cs">` napevno, i když je zobrazená angličtina.

### i18n (ad-hoc)
- `Language = 'cs' | 'en'`, `LocalizedString = Record<Language, string>`, `formatMessage()` s `{{var}}` placeholdery.
- Texty jsou **inline v komponentách** (`INTRO_COPY`, `ABOUT_COPY`, `PROJECT_GALLERY_COPY`, `COPY` v LanguageSwitcheru) + `src/lib/projects.ts` s lokalizovanými poli.
- Žádný routing podle jazyka, žádné cookie; volba se ukládá do `localStorage` (`smolikja.language`).

### Styling
- Tailwind je naimportovaný (`@import "tailwindcss"`), ale prakticky **nepoužitý** – jediná utilita je `antialiased` na `<body>`. Vše ostatní je 1 670 řádků ručního CSS s BEM-ish třídami (`.section-*`, `.gallery-*`, `.about-cta__*`), Safari hacky (`@supports (-webkit-hyphens:none)`), `!important`, `transition: all`, duplicitní media queries.
- Fonty Geist/Geist Mono se načítají přes `next/font`, ale `body { font-family: Arial }` je přebíjí → fonty se stahují zbytečně.
- Pouze dark režim (černé pozadí), tokeny `--background/--foreground` jako hex.

### Komponenty / chování, které je nutné zachovat
1. **Intro**: video logo s výběrem rozlišení podle viewportu a `navigator.connection` (480p–2160p, webm/mp4), lazy start přes IntersectionObserver, statický fallback (SVG logo + šipka) pro `saveData`/slow-2g/chybu, scroll hint po 8 s.
2. **Projekty**: 4 projekty, každý s horizontální galerií screenshotů (9:19.5), vlastní scrollbar (drag, click, klávesnice Home/End/šipky), gradientové okraje podle možnosti scrollu, stavy loading/error per obrázek.
3. **O nás**: text, CTA na Discord, odkaz na SKLAD, social ikony (e-mail, GitHub, Discord).
4. **Plovoucí přepínač jazyka** zobrazený jen když je z ≥ 50 % vidět sekce `projects` nebo `about`.
5. Scroll-snap kontejner na ≥ 768 px (vypnutý v Safari), `100dvh` sekce.

### Data a assety
- Všechny assety jsou **mimo repo** na `https://smolikja.team/assets/**`: video `loop2x/team-logo-{480p,720p,1080p,2160p}.{webm,mp4}`, `logo-white.svg`, `logo-card.gif` (OG), `projects/{studanky,domov,stable,auth-flow}/*.png`.
- `next/image` s `remotePatterns` na vlastní doménu, `quality={100}`.

### Metadata / SEO
- `metadata` v layoutu: ~60 keywords (Google ignoruje), desítky nestandardních `other` meta (`ai:*`, `schema:*`, `contact:*` – bez efektu), placeholder verifikační kódy (`your-google-verification-code`), ručně v `<head>` viewport/manifest/hreflang (duplikuje `alternates.languages`; všechny hreflang míří na stejnou URL – pro vyhledávače nevalidní).
- JSON-LD `Organization` + `WebSite` inline přes `dangerouslySetInnerHTML`.
- `public/sitemap.xml` uvádí neexistující routy (`/portfolio`, `/about`, `/contact`, `/cs`). `robots.txt` obsahuje `Host:` (jen Yandex), `Crawl-delay` a **`Disallow: /_next/`** (blokuje JS/CSS pro Googlebot rendering – škodí).
- `manifest.json` s nestandardním polem `developer`, ikona jen `favicon.ico`.

### Konfigurace Next
- `output`: `export` (přes `NEXT_OUTPUT_MODE`) nebo `standalone`; `trailingSlash: true`; `headers()` (v export režimu se neaplikují; `X-XSS-Protection` je deprecated); `experimental.optimizeServerReact`; `images.formats` webp+avif.

### Deploy (současný)
- Dvě cesty: statický export → nginx (`deploy-static.sh`), nebo standalone → PM2/systemd + nginx proxy. Skripty mají napevno zastaralou cestu `/Users/jakubsmolik/Developer/gitrepos/portfolio-web`, nginx konfigy placeholder domény.
- `.env.local` obsahuje `NODE_ENV=production` (Next před tím varuje, rozbíjí `next dev`). `.gitignore` má `.env*`, takže i `.env.local.example` je ignorovaný (není tracked).

### Mrtvý / zastaralý kód
- `SafariDetection.tsx` (exportováno, nikde nerenderováno), `lib/dev-utils.ts`, `BREAKPOINTS`, `ANIMATION_DURATIONS`, `APP_CONFIG` (verze 1.0.1 vs. package 1.2.0), `.is-safari` třída bez CSS, `tailwind.config.ts`, `tsconfig` include `out/types`.
- `NEXT_PUBLIC_GA_ID` v env example – v kódu nepoužito.

### Git
- Branches: `main`, `feature/redesign` (experiment s `motion`, `embla-carousel`, `ogl` – 3 WIP commity), `feature/redesign_v2` (aktuální, = `main`). Remote `github.com/smolikja-team/smolikja.team`.
- Commity převážně conventional (`feat:`, `fix:`, `refactor:`), občas volné (`optimalizations`, `cleaning`, `bump version`).

## 4. Gap analýza vůči cílovému stacku

| # | Sekce cílového stacku | Současný stav | Rozsah změny |
| --- | --- | --- | --- |
| 1 | Node 24 + pnpm 12.4.1 (Corepack) + TS 6 + ESLint 9 flat + Vitest 5 + Tailwind 4 | npm, TS 5.8, ESLint přes FlatCompat, bez testů | toolchain kompletně vyměnit; Tailwind jen upgrade |
| 2 | Tabulka závislostí, bez Radix/next-intl/RHF/Vercel/CI | 3 deps | přidat shadcn (Base UI), cva/clsx/tailwind-merge, zod 4, vitest; odebrat `@eslint/eslintrc`, `@next/bundle-analyzer` (dle seznamu) |
| 3 | Bootstrap `create-next-app` → `shadcn init --base base --preset base-nova` | – | provést ve stávajícím repu (ne nový projekt), zachovat historii |
| 4 | Konfigurační soubory | vlastní, částečně zastaralé | nahradit verbatim z referenčního projektu |
| 5 | `@theme inline`, oklch tokeny, radius scale, `cn()`, `cva`, `Reveal` | 1 670 ř. ručního CSS, hex tokeny | **největší kus práce** – přepis UI na Tailwind utility + shadcn primitiva |
| 6 | RSC default, client islands, config vs. messages | vše client | překlopit sekce na RSC, client jen video/galerie/switcher |
| 7 | Always-prefixed routing, `proxy.ts`, typed Dictionary, `messages/validate.ts`, lazy katalogy | client-side toggle, texty inline | nový `app/[locale]/` strom, extrakce všech textů do `messages/{cs,en}.ts`, redirect `/` → `/{locale}/` |
| 8 | Server Action + Zod 4 + honeypot + rate-limit + `useActionState` | žádný formulář (jen mailto/Discord) | **k rozhodnutí** – přidat kontaktní formulář, nebo sekci vynechat |
| 9 | `generateMetadata`, `robots/sitemap/manifest.ts`, `next/og` | statická metadata, ruční XML/JSON v `public/` | přepsat na file-based metadata routes, per-locale metadata, vyčistit nestandardní meta |
| 10 | Kolokované `*.test.ts`, node env, `next/experimental/testing/server` | žádné | přidat Vitest, testy pro messages/validate, proxy, (action) |
| 11 | README/docs pravidla, `check-docs.mjs`, `AGENTS.md` managed block | README zastaralý (odkazuje na neexistující `docs/`) | přepsat README, založit docs/, AGENTS.md |
| 12 | `nixpacks.toml` + Coolify + shoda pnpm verzí | nginx/PM2 skripty | nahradit `deploy/` za `nixpacks.toml`; vyžaduje SSR (i18n proxy) → konec statického exportu |
| 13 | Agent skilly + Chrome DevTools MCP | – | nainstalovat sadu dle referenčního projektu |
| 14 | Git styl | conventional-ish | sjednotit |

## 5. Navržené fáze migrace (hrubý plán, upřesní se po doplnění referenčních souborů)

0. **Příprava** – nová branch `feature/stack-migration`, tento dokument, `AGENTS.md`.
1. **Toolchain** – `.nvmrc`, `engines`, `packageManager` (pnpm 12.4.1), `pnpm-workspace.yaml`, smazat `package-lock.json` + `node_modules`, `pnpm install`; upgrade Next/React/TS 6/ESLint flat/`@types/node@24`; nové `tsconfig`, `eslint.config.mjs`, `next.config.ts`, `.gitignore`, `.env.example`. Ověření: `pnpm typecheck && pnpm lint && pnpm build`.
2. **Styling základ** – `shadcn init --base base --preset base-nova` → `components.json`, `globals.css` kostra (`@theme inline`, oklch tokeny, radius), `cn()`, `cva` pattern, fonty přes `next/font` (Geist). Smazat `tailwind.config.ts`.
3. **i18n & struktura** – `app/[locale]/layout.tsx|page.tsx`, `proxy.ts`, `src/messages/{cs,en}.ts` + `Dictionary` typ + `validate.ts`, `src/config/*` (site, projects, social), lazy import katalogů; sekce jako RSC s `dictionary` props; client islands: `IntroVideo`, `ProjectGallery`, `LocaleSwitcher` (přepíná URL, ne state).
4. **Přepis UI** – sekce po sekci na Tailwind utility + shadcn/Base UI primitiva (`Button`, `Card`/`Badge`, `ScrollArea`/`Carousel` dle dostupnosti v presetu), `Reveal` s `prefers-reduced-motion`; zachovat chování z §3. Smazat staré CSS.
5. **Metadata/SEO** – `generateMetadata` v `[locale]/layout.tsx` (title, description, canonical, hreflang cs/en/x-default, OG/Twitter), `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/[locale]/opengraph-image.tsx` (next/og), JSON-LD jako komponenta; smazat `public/{robots.txt,sitemap.xml,manifest.json}`.
6. **Mutace** (pokud se schválí kontaktní formulář) – `actions/contact.ts` + Zod 4 + honeypot + rate-limit + `useActionState`.
7. **Testy** – `vitest.config.mts`, testy: `messages/validate`, `proxy` (matcher/redirect), `actions/contact`, utils (`getOptimalVideoResolution`).
8. **Docs & agent files** – README, `docs/`, `check-docs.mjs`, `AGENTS.md` managed block, skilly + Chrome DevTools MCP.
9. **Deploy** – `nixpacks.toml`, Coolify nastavení, smazat `deploy/` a `scripts/export-build.cjs`; ověřit `pnpm build && pnpm start` lokálně, Lighthouse/CWV porovnání s původní verzí.
10. **Cleanup & QA** – odstranit mrtvý kód, a11y audit, kontrola v Safari/iOS (scroll-snap, video autoplay), commit po fázích.

## 6. Otevřené otázky

Viz konverzaci – rozděleno na (A) obsah, který je nutné získat z referenčního projektu verbatim, a (B) rozhodnutí specifická pro tento web.
