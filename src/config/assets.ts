/** Locale-independent brand assets served from `public/`. */
export const brandAssets = {
  wordmark: {
    src: "/assets/logo-white.svg",
    width: 596,
    height: 133,
  },
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
