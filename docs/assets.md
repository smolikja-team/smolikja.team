# Web assets

All binary assets are committed under `public/` and served from the site root.

## Layout

| Path | Contents | Registered in |
| --- | --- | --- |
| `public/assets/logo-white.svg` | Wordmark (596×133), white on transparent. Also inlined as `src/components/icons/brand-logo.tsx` so it inherits `currentColor`. | `src/config/assets.ts` |
| `public/assets/loop2x/team-logo-{480p,720p,1080p,2160p}.{webm,mp4}` | The 16 s, 16:9 rotating-logo loop in four encodes (≈2–19 MB each). The 480p encode is the header's animated wordmark; the larger ones are kept because the URLs are public. | `src/config/video.ts` |
| `public/assets/work/<kind>-<screen>.png` | Portrait phone screens from real apps, named by kind of app, never by client or product. | `src/config/work.ts` |
| `public/assets/about/portrait.jpg`, `workspace.jpg` | The owner's portrait (1254×1254) and workspace photo (1447×1087), supplied by the owner without generator metadata. The workspace photo is AI-enhanced from a real photo of the actual workspace (owner's decision, 2026-10-08). | `src/config/assets.ts` |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | PWA icons for the manifest. | `src/config/assets.ts` |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Favicons via Next.js file conventions. | — |
| `src/lib/og/instrument-sans-600.ttf` | Display font bundled for `next/og` (Satori's built-in font has no Czech glyphs). | `src/lib/og/og-image.tsx` |

The logo and video paths under `/assets/*` predate the migration and are
referenced from outside the site; keep them stable.

## Screenshots

Register every screen with its intrinsic pixel size; `next/image` uses it for
the aspect ratio and responsive `srcset`. Current sources are 1320×2868 and
1284×2778 (3×) and 390×844 (1×, the agriculture screens) — all ≈ 9:19.5. The
1× sources are shown at modest widths (≤ 250 CSS px), in the gallery and as the
hero's back device (the owner's choice for the stable ventilation screen). Do
not upscale 1× sources. Alt text and captions live in the message catalogs
under `work.images.<id>`; see [Localization](localization.md).

Screens must not reveal client data: the owner supplies anonymised exports
(for example without real site or customer names). The project screenshots
used until October 2026 under `public/assets/projects/` were removed at the
owner's request, so those URLs no longer resolve. The smart-home dashboard's
empty upper half is intentional: content starts in the lower half so the app
can be operated one-handed, which its caption explains.

Screens are shown inside a front-view mockup of a current iPhone Pro
(`landing/device-frame.tsx`, iPhone 17 Pro proportions): CSS only, coloured
by the `--device-*` tokens in `globals.css`, with the screenshot cropped to
the device's screen (`object-cover`, top-aligned) and a drawn Dynamic Island
that covers any island a capture tool already painted. Changing a screen's
content means a new file name: optimised images are cached by URL and cannot
be invalidated.

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
