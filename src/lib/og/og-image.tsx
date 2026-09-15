import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Page palette (see globals.css) as hex, because Satori has no CSS variables.
const BACKGROUND = "#F7F9FC";
const FOREGROUND = "#171C26";
const MUTED = "#596273";
const PRIMARY = "#214EC7";

// Static assets are read once at module load (hoisted I/O): the wordmark as a
// data URL for Satori's <img> (recoloured from white to the page foreground),
// and the display font as raw TTF bytes. The font is bundled with the page
// because Satori's built-in font has no Czech glyphs.
const wordmarkDataUrl = (() => {
  try {
    const svg = readFileSync(join(process.cwd(), "public/assets/logo-white.svg"), "utf8");
    const recoloured = svg.replace(/#ffffff/gi, FOREGROUND);
    return `data:image/svg+xml;base64,${Buffer.from(recoloured).toString("base64")}`;
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
 * Renders the site's OpenGraph card: wordmark on the light page canvas, the
 * offer headline, a muted subtitle, domain in the corner. Shared by every locale's `opengraph-image`.
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
          background: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "Instrument Sans",
        }}
      >
        {wordmarkDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={wordmarkDataUrl} alt="" width={420} height={94} />
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
          <div style={{ fontSize: 32, color: MUTED }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 28, color: PRIMARY }}>
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
