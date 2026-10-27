/**
 * Photos of the owner, served from `public/assets/about`. Sizes are the
 * intrinsic pixel sizes of the JPEGs.
 */
export const ownerPhotos = {
  portrait: { src: "/assets/about/portrait.jpg", width: 1254, height: 1254 },
  workspace: { src: "/assets/about/workspace.jpg", width: 1447, height: 1087 },
} as const;

/** Locale-independent brand assets served from `public/`. */
export const brandAssets = {
  icons: {
    pwa192: { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    pwa512: { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    maskable512: {
      src: "/brand/icon-512-maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  },
} as const;
