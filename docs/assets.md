# Web assets

All binary assets are committed under `public/` and served from the site root.

## Layout

| Path | Contents | Registered in |
| --- | --- | --- |
| `public/assets/logo-white.svg` | Wordmark (596×133), white on transparent. Also inlined as `src/components/icons/brand-logo.tsx` so it inherits `currentColor`. | `src/config/assets.ts` |
| `public/assets/loop2x/team-logo-{480p,720p,1080p,2160p}.{webm,mp4}` | The 16 s, 16:9 logo loop in four encodes (≈2–19 MB each). Not used by the landing page since the 2026-09 repositioning; kept because the URLs are public. | — |
| `public/assets/projects/<id>/<screenshot>.png` | Portrait phone screenshots per project. | `src/config/projects.ts` |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | PWA icons for the manifest. | `src/config/assets.ts` |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Favicons via Next.js file conventions. | — |
| `src/lib/og/instrument-sans-600.ttf` | Display font bundled for `next/og` (Satori's built-in font has no Czech glyphs). | `src/lib/og/og-image.tsx` |

The `/assets/*` paths predate the migration and are referenced from outside
the site; keep them stable.

## Screenshots

Register every screenshot with its intrinsic pixel size; `next/image` uses it
for the aspect ratio and responsive `srcset`. Current sources are 375×813
(Studánky), 390×844 (Inteligentní stáj) and 1290×2796 (Domov pod palcem) —
all ≈ 9:19.5. The two 1× sources are shown at modest widths (≤ 250 CSS px);
only the 3× Domov exports are used for the large hero screen. Refresh the 1×
sets from a real build before giving them a prominent, high-density place; do
not upscale them. Alt text lives in the message catalogs under
`projects.items.<id>.images.<screenshot>`; see [Localization](localization.md).

Choose readable application states over splash screens, and screens that are
full views rather than sheets over a dimmed background (the Domov `heating`
and `blinder` sheets read well inside a story, the `time-regime` schedule is
the hero's large screen). The screenshots carry their own status bars, so no
device frame is drawn around them.

## Icons

The favicon and PWA icons are the wordmark's "S" (path 8 of the SVG, whose
long top bar runs out of the frame) on black. They were generated with `sharp`
from `public/assets/logo-white.svg` at 16 % padding (24 % for the maskable
variant); regenerate the same way if the wordmark changes.
