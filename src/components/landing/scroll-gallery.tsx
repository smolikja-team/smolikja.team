"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";

import type { WorkImage } from "@/config/work";
import type { WorkImageCopy, WorkImageId } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";

/**
 * The strip's screens are small (at most 272 CSS px wide), so they are
 * optimised at a lower quality than the default 75 used by the hero. It also
 * gives the two hero screens, which appear here again, a URL of their own:
 * Next.js tracks images by URL in development, and the lazy copy here would
 * otherwise overwrite the eager hero one and trigger a false "LCP image
 * should be eager" warning. Listed in `images.qualities` (next.config.ts).
 */
const GALLERY_QUALITY = 70;

/** When the strip is not pinned; the same query as the `unpinned` variant (globals.css). */
const UNPINNED_QUERY = "(prefers-reduced-motion: reduce) or (pointer: coarse)";

/** One device on the strip with its caption centred below. */
function Slide({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <li className="w-(--slide-w) snap-start scroll-ms-(--page-inset)">
      <figure className="flex flex-col gap-4">
        {children}
        <figcaption className="text-center text-sm text-balance text-muted-foreground">
          {caption}
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * The section heading and screens in iPhone mockups on a horizontal strip
 * driven by the page's own vertical scroll. Heading and strip pin together
 * (a sticky stage below the header, so the strip never reads as a separate
 * section) and further scrolling moves the strip sideways; once its last
 * device lines up with the right content edge, the page scrolls on. A
 * progress bar spanning the content width fills as it moves.
 *
 * Nothing intercepts wheel or touch events — the scroll distance is simply
 * added to the page as height — so keyboard, wheel and trackpad all behave
 * as normal page scrolling. On touch screens, where a vertical swipe moving
 * the strip sideways feels unnatural, and for visitors who prefer reduced
 * motion, it is instead a plain strip swiped sideways while vertical swipes
 * scroll the page. That switch is pure CSS (the `pinned:` / `unpinned:`
 * variants in globals.css), so server and client markup match.
 *
 * CSS variables: `--page-inset` mirrors the page container (`max-w-6xl` with
 * `px-5`/`px-6`) so the first and last device align with the content edges;
 * when pinned, `--slide-w` shrinks with the window height so heading,
 * devices, captions and progress bar fit the stage (`--chrome` is the room
 * they need besides the devices); unpinned, nothing has to fit one screen, so
 * a device takes most of a phone's width and the next one peeks in;
 * `--scroll-distance` starts as a CSS estimate (no layout shift before
 * hydration) and is replaced by the measured value.
 */
export function ScrollGallery({
  heading,
  images,
  copy,
  label,
  closing,
}: {
  /** Section heading, pinned with the strip and aligned with the content. */
  heading: ReactNode;
  images: readonly WorkImage[];
  copy: Record<WorkImageId, WorkImageCopy>;
  label: string;
  /** A last device with drawn screen content instead of a screenshot. */
  closing?: { screen: ReactNode; caption: string };
}) {
  const slides = images.length + (closing ? 1 : 0);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const distance = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !viewport || !track) return;

    const unpinned = window.matchMedia(UNPINNED_QUERY);
    const measure = () => {
      // Unpinned, the strip scrolls natively and the track never moves with
      // the page.
      const value = unpinned.matches ? 0 : Math.max(0, track.offsetWidth - viewport.clientWidth);
      distance.set(value);
      stage.style.setProperty("--scroll-distance", `${value}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    unpinned.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      unpinned.removeEventListener("change", measure);
    };
  }, [distance]);

  // 0 when the stage's top meets the bottom of the 64 px header (the strip is
  // centred on screen), 1 when its bottom meets the bottom of the window.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start 64px", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  return (
    <div
      ref={stageRef}
      style={{ "--slides": slides } as CSSProperties}
      className={cn(
        "relative mx-[calc(50%-50vw)] [--gap:1rem] [--page-inset:1.25rem] sm:[--gap:1.5rem] sm:[--page-inset:max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]",
        "[--chrome:26rem] [--slide-max:11.5rem] sm:[--chrome:22rem] sm:[--slide-max:15rem] lg:[--chrome:18.5rem] lg:[--slide-max:16.5rem]",
        "[--slide-w:clamp(7rem,calc((100svh_-_4rem_-_var(--chrome))_/_2.15),var(--slide-max))]",
        "unpinned:[--slide-w:clamp(9rem,min(68vw,calc((100svh_-_8rem)_/_2.15)),17rem)]",
        "[--scroll-distance:max(0px,calc(var(--slides)_*_var(--slide-w)_+_(var(--slides)_-_1)_*_var(--gap)_+_2_*_var(--page-inset)_-_100vw))]",
        "pinned:h-[calc(100svh_-_4rem_+_var(--scroll-distance))]",
      )}
    >
      <div className="flex flex-col justify-center gap-8 pinned:sticky pinned:top-16 pinned:h-[calc(100svh_-_4rem)] pinned:overflow-hidden">
        <div className="px-(--page-inset)">{heading}</div>
        <div
          ref={viewportRef}
          className="pinned:overflow-hidden unpinned:snap-x unpinned:snap-mandatory unpinned:overflow-x-auto"
        >
          <motion.ul
            ref={trackRef}
            aria-label={label}
            style={{ x }}
            className="flex w-max gap-(--gap) px-(--page-inset) py-4"
          >
            {images.map((image) => (
              <Slide key={image.id} caption={copy[image.id].caption}>
                <DeviceFrame
                  image={image}
                  alt={copy[image.id].alt}
                  sizes="(min-width: 640px) 272px, 68vw"
                  quality={GALLERY_QUALITY}
                />
              </Slide>
            ))}
            {closing ? (
              <Slide caption={closing.caption}>
                <DeviceFrame>{closing.screen}</DeviceFrame>
              </Slide>
            ) : null}
          </motion.ul>
        </div>

        <div aria-hidden="true" className="px-(--page-inset) unpinned:hidden">
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
