/**
 * The rotating-logo loop (16 s, 16:9, white logo on black) used as the
 * animated wordmark in the site header. The header blends the black frame
 * away (see `site-logo.tsx`), so only the smallest encode is needed.
 */
export const headerLogoVideo = {
  sources: [
    { src: "/assets/loop2x/team-logo-480p.webm", type: "video/webm" },
    { src: "/assets/loop2x/team-logo-480p.mp4", type: "video/mp4" },
  ],
} as const;
