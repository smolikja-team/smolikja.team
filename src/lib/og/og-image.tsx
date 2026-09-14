import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Static assets are read once at module load (hoisted I/O): the wordmark as a
// data URL for Satori's <img>, and the display font as raw TTF bytes. The font
// is bundled with the page because Satori's built-in font has no Czech glyphs.
const wordmarkDataUrl = (() => {
  try {
    const svg = readFileSync(join(process.cwd(), "public/assets/logo-white.svg"));
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return "";
  }
})();

const fontData = (() => {
  try {
    return readFileSync(join(process.cwd(), "src/lib/og/instrument-sans-600.ttf"));
  } catch {
    return null;
  }
})();

/**
 * Renders the site's OpenGraph card: wordmark on true black, the statement
 * headline, a muted subtitle, domain in the corner. Shared by every locale's `opengraph-image`.
 */
export function renderOgImage({
  title,
  subtitle,
  domain,
}: {
  title: string;
  subtitle: string;
  domain: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000000",
          color: "#fafafa",
          fontFamily: "Instrument Sans",
        }}
      >
        {wordmarkDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={wordmarkDataUrl} alt="" width={520} height={116} />
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 36, color: "#a3a3a3" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 28, color: "#a3a3a3" }}>
          {domain}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fontData
        ? [{ name: "Instrument Sans", data: fontData, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
