"use client";

import { useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { heroVideo, heroVideoSource, type HeroVideoResolution } from "@/config/video";
import type { Dictionary } from "@/i18n/dictionary";
import { physicalMaxDimension, pickHeroVideoResolution, type ConnectionHint } from "@/lib/video";
import { BrandLogo } from "@/components/icons/brand-logo";

type NavigatorWithConnection = Navigator & { connection?: ConnectionHint };

// The encode choice depends on browser-only data (viewport, DPR, connection).
// `useSyncExternalStore` renders the server snapshot (no video) during
// hydration and switches to the client value right after, without a
// setState-in-effect and without a hydration mismatch. Snapshots are cached by
// viewport key so React sees a stable value between resizes.
let cachedKey = "";
let cachedResolution: HeroVideoResolution | null = null;

function subscribe(onChange: () => void): () => void {
  window.addEventListener("resize", onChange, { passive: true });
  return () => window.removeEventListener("resize", onChange);
}

function getSnapshot(): HeroVideoResolution | null {
  const physical = physicalMaxDimension(
    window.innerWidth,
    window.innerHeight,
    window.devicePixelRatio,
  );
  const connection = (navigator as NavigatorWithConnection).connection;
  const key = `${physical}:${connection?.effectiveType ?? ""}:${connection?.saveData ? 1 : 0}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedResolution = pickHeroVideoResolution(physical, connection);
  }
  return cachedResolution;
}

function getServerSnapshot(): HeroVideoResolution | null {
  return null;
}

type Status = "loading" | "ready" | "error";

/**
 * Looping logo animation on true black. The inline wordmark underneath is the
 * instant, JS-free fallback: it shows until the first frame can play, and stays
 * when the visitor prefers reduced data or the video fails.
 */
export function HeroVideo({ copy }: { copy: Dictionary["hero"] }) {
  const resolution = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [status, setStatus] = useState<Status>("loading");
  const showVideo = resolution !== null && status !== "error";

  return (
    <div className="absolute inset-0">
      <div
        aria-hidden={showVideo && status === "ready"}
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
          showVideo && status === "ready" ? "opacity-0" : "opacity-100",
        )}
      >
        <BrandLogo role="img" aria-label={copy.logoAlt} className="w-[clamp(11rem,38vw,26rem)]" />
      </div>

      {showVideo ? (
        <video
          key={resolution}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-full object-contain transition-opacity duration-700",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
          onCanPlay={() => setStatus("ready")}
          onError={() => setStatus("error")}
        >
          {heroVideo.formats.map((format) => (
            <source
              key={format.extension}
              src={heroVideoSource(resolution, format.extension)}
              type={format.type}
            />
          ))}
          {copy.videoUnsupported}
        </video>
      ) : null}
    </div>
  );
}
