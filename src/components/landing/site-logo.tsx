"use client";

import { useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/icons/brand-logo";
import { headerLogoModel } from "@/config/logo";
import { cn } from "@/lib/utils";

/**
 * The header wordmark: the static SVG first, then — once the browser is idle
 * — the spinning 3D model fades in over it (`site-logo-scene.ts`). The 3D
 * version is skipped for visitors who prefer reduced motion and whenever
 * WebGL is unavailable; the SVG stays in both cases.
 */
export function SiteLogo({ className }: { className?: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const controller = new AbortController();
    let dispose: (() => void) | undefined;

    function start() {
      import("./site-logo-scene")
        .then(({ mountHeaderLogo }) => mountHeaderLogo(el!, headerLogoModel.src, controller.signal))
        .then((cleanup) => {
          if (controller.signal.aborted) return cleanup();
          dispose = cleanup;
          setReady(true);
        })
        .catch(() => {
          // No WebGL or unmounted: the static wordmark stays.
        });
    }

    const idle = "requestIdleCallback" in window;
    const handle = idle ? window.requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 300);

    return () => {
      controller.abort();
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      dispose?.();
    };
  }, []);

  return (
    <span className={cn("relative flex h-16 w-[9.75rem] items-center justify-center", className)}>
      <BrandLogo
        className={cn(
          "h-auto w-[85%] text-muted-foreground transition-opacity duration-500",
          ready && "opacity-0",
        )}
      />
      <span
        ref={host}
        aria-hidden="true"
        className={cn("absolute inset-0 opacity-0 transition-opacity duration-500", ready && "opacity-100")}
      />
    </span>
  );
}
