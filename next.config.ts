import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    // Enables `app/global-not-found.tsx` — the documented way to render a
    // consistent 404 when the root layout lives under a dynamic segment
    // (`app/[locale]/layout.tsx`). Lets the 404 be fully server-rendered with
    // its own localized <html lang> document.
    globalNotFound: true,
    serverActions: {
      // The contact form is the only Server Action and its payload is small.
      // Keep the parser limit close to the expected shape instead of the 1 MB
      // default.
      bodySizeLimit: "32kb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
