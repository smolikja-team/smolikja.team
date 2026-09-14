import { heroVideo, type HeroVideoResolution } from "@/config/video";

/** Subset of the Network Information API the selection cares about. */
export type ConnectionHint = {
  effectiveType?: string;
  saveData?: boolean;
};

/**
 * Physical pixels along the longer viewport edge. The DPR is capped at 2: a
 * 3× phone gains nothing from a 2160p encode of a logo animation, but it would
 * pay for it in bytes.
 */
export function physicalMaxDimension(
  width: number,
  height: number,
  devicePixelRatio = 1,
): number {
  const dpr = Math.min(Math.max(devicePixelRatio, 1), 2);
  return Math.round(Math.max(width, height) * dpr);
}

const SIZE_STEPS: readonly { maxPhysical: number; resolution: HeroVideoResolution }[] = [
  { maxPhysical: 900, resolution: "480p" },
  { maxPhysical: 1400, resolution: "720p" },
  // Most laptops (2× 1440–1800 px) land here; 2160p (19 MB) is reserved for
  // genuine 4K/5K displays.
  { maxPhysical: 3000, resolution: "1080p" },
];

function capResolution(
  chosen: HeroVideoResolution,
  cap: HeroVideoResolution,
): HeroVideoResolution {
  const order = heroVideo.resolutions.map((r) => r.id);
  return order.indexOf(chosen) > order.indexOf(cap) ? cap : chosen;
}

/**
 * Picks the hero video encode for a viewport, or `null` when the visitor asked
 * for reduced data / is on a 2G-class connection and should get the static
 * logo instead.
 */
export function pickHeroVideoResolution(
  physicalMax: number,
  connection?: ConnectionHint,
): HeroVideoResolution | null {
  if (connection?.saveData) return null;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
    return null;
  }

  const bySize =
    SIZE_STEPS.find((step) => physicalMax <= step.maxPhysical)?.resolution ?? "2160p";

  return connection?.effectiveType === "3g" ? capResolution(bySize, "720p") : bySize;
}
