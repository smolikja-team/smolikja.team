"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";

import type { WorkImage } from "@/config/work";
import type { WorkImageCopy, WorkImageId } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";

/**
 * Screens in iPhone mockups on a horizontal strip driven by the page's own
 * vertical scroll. When the strip reaches the middle of the screen it pins
 * (a sticky stage below the header) and further scrolling moves it sideways;
 * once its last device lines up with the right content edge, the page
 * scrolls on. A progress bar spanning the content width fills as it moves.
 *
 * Nothing intercepts wheel or touch events — the scroll distance is simply
 * added to the page as height — so keyboard, wheel, trackpad and touch all
 * behave as normal page scrolling. Visitors who prefer reduced motion get a
 * plain horizontally scrollable strip instead; that switch is pure CSS
 * (`motion-safe:` / `motion-reduce:`), so server and client markup match.
 *
 * CSS variables: `--page-inset` mirrors the page container (`max-w-6xl` with
 * `px-5`/`px-6`) so the first and last device align with the content edges;
 * `--scroll-distance` starts as a CSS estimate (no layout shift before
 * hydration) and is replaced by the measured value.
 */
export function ScrollGallery({
  images,
  copy,
  label,
}: {
  images: readonly WorkImage[];
  copy: Record<WorkImageId, WorkImageCopy>;
  label: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const distance = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      // With reduced motion the strip scrolls natively, so nothing is pinned
      // and the track never moves with the page.
      const value = reducedMotion.matches
        ? 0
        : Math.max(0, track.offsetWidth - viewport.clientWidth);
      distance.set(value);
      stage.style.setProperty("--scroll-distance", `${value}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    reducedMotion.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", measure);
    };
  }, [distance]);

  // 0 when the stage's top meets the bottom of the 64 px header (the strip is
  // centred on screen), 1 when its bottom meets the bottom of the window.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start 64px", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  return (
    <div
      ref={stageRef}
      style={{ "--slides": images.length } as CSSProperties}
      className={cn(
        "relative mx-[calc(50%-50vw)] [--gap:1rem] [--page-inset:1.25rem] [--slide-w:11.5rem] sm:[--gap:1.5rem] sm:[--page-inset:max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] sm:[--slide-w:14rem] lg:[--slide-w:15rem]",
        "[--scroll-distance:max(0px,calc(var(--slides)_*_var(--slide-w)_+_(var(--slides)_-_1)_*_var(--gap)_+_2_*_var(--page-inset)_-_100vw))]",
        "motion-safe:h-[calc(100svh_-_4rem_+_var(--scroll-distance))]",
      )}
    >
      <div className="flex flex-col justify-center gap-8 motion-safe:sticky motion-safe:top-16 motion-safe:h-[calc(100svh_-_4rem)] motion-safe:overflow-hidden">
        <div
          ref={viewportRef}
          className="motion-safe:overflow-hidden motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto"
        >
          <motion.ul
            ref={trackRef}
            aria-label={label}
            style={{ x }}
            className="flex w-max gap-(--gap) px-(--page-inset) py-4"
          >
            {images.map((image) => (
              <li key={image.id} className="w-(--slide-w) snap-start scroll-ms-(--page-inset)">
                <figure className="flex flex-col gap-4">
                  <DeviceFrame
                    image={image}
                    alt={copy[image.id].alt}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 224px, 184px"
                  />
                  <figcaption className="text-center text-sm text-balance text-muted-foreground">
                    {copy[image.id].caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </motion.ul>
        </div>

        <div aria-hidden="true" className="px-(--page-inset) motion-reduce:hidden">
          <div className="h-0.5 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full origin-left rounded-full bg-foreground"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
