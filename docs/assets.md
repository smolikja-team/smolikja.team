# Web assets

All binary assets are committed under `public/` and served from the site root.

## Layout

| Path | Contents | Registered in |
| --- | --- | --- |
| `public/assets/logo-white.svg` | Wordmark (596×133), white on transparent. Also inlined as `src/components/icons/brand-logo.tsx` so it inherits `currentColor`. | `src/config/assets.ts` |
| `public/assets/loop2x/team-logo-{480p,720p,1080p,2160p}.{webm,mp4}` | The 16 s, 16:9 rotating-logo loop in four encodes (≈2–19 MB each). The 480p encode is the header's animated wordmark; the larger ones are kept because the URLs are public. | `src/config/video.ts` |
| `public/assets/projects/<id>/<screenshot>.png` | Portrait phone screenshots per project. | `src/config/projects.ts` |
| `public/assets/about/portrait.jpg`, `workspace.jpg` | The owner's portrait (1254×1254) and workspace photo (1447×1087), supplied by the owner without generator metadata. The workspace photo is AI-enhanced from a real photo of the actual workspace (owner's decision, 2026-10-08). | `src/config/assets.ts` |
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

Choose readable application states over splash screens (the stable splash
screen is deliberately not registered), and put screens that are full views
first — the `time-regime` schedule is the hero's large screen because sheets
over a dimmed background read poorly at that size. Screens are shown inside
a slim dark bezel (`landing/phone-frame.tsx`); the screenshots carry their own
status bars and cutouts, so the frame draws no second notch.

## Header wordmark video

`landing/site-logo.tsx` plays the 480p loop muted with `filter: invert(1)`
and `mix-blend-mode: multiply`: the black frame becomes transparent on the
solid header and the white logo becomes dark. The wrapper crops the 16:9
frame to the band the logo rotates in. Visitors with reduced motion get the
static SVG wordmark; the footer and share image always use the SVG.

## Icons

The favicon and PWA icons are the wordmark's "S" (path 8 of the SVG, whose
long top bar runs out of the frame) on black. They were generated with `sharp`
from `public/assets/logo-white.svg` at 16 % padding (24 % for the maskable
variant); regenerate the same way if the wordmark changes.
