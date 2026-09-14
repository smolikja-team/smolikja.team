# Web assets

All binary assets are committed under `public/` and served from the site root.

## Layout

| Path | Contents | Registered in |
| --- | --- | --- |
| `public/assets/logo-white.svg` | Wordmark (596×133), white on transparent. Also inlined as `src/components/icons/brand-logo.tsx` so it inherits `currentColor`. | `src/config/assets.ts` |
| `public/assets/loop2x/team-logo-{480p,720p,1080p,2160p}.{webm,mp4}` | The 16 s, 16:9 logo loop in four encodes (≈2–19 MB each). | `src/config/video.ts` |
| `public/assets/projects/<id>/<screenshot>.png` | Portrait phone screenshots per project. | `src/config/projects.ts` |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | PWA icons for the manifest. | `src/config/assets.ts` |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Favicons via Next.js file conventions. | — |
| `src/lib/og/instrument-sans-600.ttf` | Display font bundled for `next/og` (Satori's built-in font has no Czech glyphs). | `src/lib/og/og-image.tsx` |

The `/assets/*` paths predate the migration and are referenced from outside
the site; keep them stable.

## Hero video

Encodes are chosen at runtime by `src/lib/video.ts` from the physical
viewport (CSS pixels × DPR, DPR capped at 2) and `navigator.connection`:

| Physical longer edge | Encode |
| --- | --- |
| ≤ 900 px | 480p |
| ≤ 1400 px | 720p |
| ≤ 3000 px | 1080p (most laptops) |
| larger | 2160p (4K/5K displays) |

`3g` caps the pick at 720p; `saveData`, `2g` and `slow-2g` skip the video and
show the inline wordmark. To re-encode, keep the same file names, the 16:9
frame and a black background — the page background is true black to match.

## Screenshots

Register every screenshot with its intrinsic pixel size; `next/image` uses it
for the aspect ratio and responsive `srcset`. Current sources are 375×813,
390×844, 1206×2622 and 1290×2796 — all ≈ 9:19.5. Alt text lives in the
message catalogs under `projects.items.<id>.images.<screenshot>`; see
[Localization](localization.md).

## Icons

The favicon and PWA icons are the wordmark's "S" (path 8 of the SVG, whose
long top bar runs out of the frame) on black. They were generated with `sharp`
from `public/assets/logo-white.svg` at 16 % padding (24 % for the maskable
variant); regenerate the same way if the wordmark changes.
