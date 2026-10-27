# Web assets

All binary assets are committed under `public/` and served from the site root.

## Layout

| Path | Contents | Registered in |
| --- | --- | --- |
| `public/assets/logo-white.svg` | Wordmark (596×133), white on transparent. Read by the share-image renderer; also inlined as `src/components/icons/brand-logo.tsx` so it inherits `currentColor`. | `src/lib/og/og-image.tsx` |
| `public/assets/logo-3d/team-logo.glb` | The 3D wordmark (≈37k triangles, metallic material) exported from the Blender scene by `scripts/export-logo-model.py`; 663 kB, ≈360 kB gzipped. | `src/config/logo.ts` |
| `public/assets/work/<kind>-<screen>.png` | Portrait phone screens from real apps, named by kind of app, never by client or product. | `src/config/work.ts` |
| `public/assets/about/portrait-2026-10.jpg`, `workspace.jpg` | The owner's portrait (1118×1118) and workspace photo (1447×1087), supplied by the owner without generator metadata. The workspace photo is AI-enhanced from a real photo of the actual workspace (owner's decision, 2026-10-08). | `src/config/assets.ts` |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | PWA icons for the manifest. | `src/config/assets.ts` |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Favicons via Next.js file conventions. | — |
| `src/lib/og/instrument-sans-600.ttf` | Display font bundled for `next/og` (Satori's built-in font has no Czech glyphs). | `src/lib/og/og-image.tsx` |

The logo path `/assets/logo-white.svg` predates the migration and is
referenced from outside the site; keep it stable. (The rendered logo-loop
videos under `/assets/loop2x/` were removed on 2026-10-27 together with the
video header.)

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

## Header wordmark

The header shows the static SVG wordmark first; once the browser is idle,
`landing/site-logo.tsx` imports `landing/site-logo-scene.ts` (three.js),
loads the glTF model, compiles its shaders and only then fades the spinning
model in over the SVG on a transparent WebGL canvas — one turn per 8 s, as in
the original render, starting from the front. The spin advances by at most
1/30 s per frame, so a busy frame slows it briefly instead of making it jump.
Reflections come from a small studio of softboxes modelled on the Blender
scene's area lights, around a mid-grey room so the chrome never reflects
black. Visitors who prefer reduced motion, and browsers without WebGL, keep
the SVG; the footer and share image always use the SVG.

It replaced a video loop rendered on black: on the white header no blend
mode could hide the black without inverting the logo.

To change the model, edit the Blender scene and export again (headless, no
rendering):

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background path/to/animation.blend \
  --python scripts/export-logo-model.py -- "$PWD/public/assets/logo-3d/team-logo.glb"
```

The `.blend` file is a source file, not a web asset, and is not kept in the
repository; never put it in `public/` (everything there is published). Compressing the
model with meshopt (`gltf-transform`) would cut it to roughly 100 kB, with
the loader's meshopt decoder enabled.

## Icons

The favicon and PWA icons are the wordmark's "S" (path 8 of the SVG, whose
long top bar runs out of the frame) on black. They were generated with `sharp`
from `public/assets/logo-white.svg` at 16 % padding (24 % for the maskable
variant); regenerate the same way if the wordmark changes.
