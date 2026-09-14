"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import type { ProjectImage } from "@/config/projects";
import { Button } from "@/components/ui/button";

type Edges = { atStart: boolean; atEnd: boolean };

const EDGE_TOLERANCE = 2;

function measure(element: HTMLElement): Edges {
  const maxScroll = element.scrollWidth - element.clientWidth;
  return {
    atStart: element.scrollLeft <= EDGE_TOLERANCE,
    atEnd: element.scrollLeft >= maxScroll - EDGE_TOLERANCE,
  };
}

/**
 * Horizontal strip of phone screenshots. Native scrolling (touch, trackpad,
 * arrow keys once the strip is focused) does the work; the buttons page by
 * one screenshot for pointer users and are disabled at either edge.
 */
export function ProjectGallery({
  images,
  alt,
  label,
  previousLabel,
  nextLabel,
  priority = false,
}: {
  images: readonly ProjectImage[];
  alt: Record<string, string>;
  label: string;
  previousLabel: string;
  nextLabel: string;
  /** Preload the first screenshot (only for the first gallery on the page). */
  priority?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Assume overflow until measured: every gallery here is wider than a phone.
  const [edges, setEdges] = useState<Edges>({ atStart: true, atEnd: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    // ResizeObserver fires once on observe, which doubles as the initial
    // measurement; later it tracks viewport changes.
    const resizeObserver = new ResizeObserver(() => setEdges(measure(scroller)));
    resizeObserver.observe(scroller);
    return () => resizeObserver.disconnect();
  }, []);

  function page(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    const first = scroller?.firstElementChild;
    if (!scroller || !(first instanceof HTMLElement)) return;
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    scroller.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    // On large screens the strip escapes the content column and runs to the
    // viewport edge; the section clips the negative margin so nothing overflows.
    <div className="flex min-w-0 flex-col gap-4 lg:mr-[calc(-1*max(1.5rem,(100vw-72rem)/2+1.5rem))]">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={(event) => setEdges(measure(event.currentTarget))}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 py-1 outline-none [scrollbar-width:none] focus-visible:ring-3 focus-visible:ring-ring/50 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 lg:pr-6 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <figure
            key={image.id}
            className="h-[26rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 sm:h-[32rem]"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Image
              src={image.src}
              alt={alt[image.id]}
              width={image.width}
              height={image.height}
              sizes="(min-width: 640px) 240px, 196px"
              priority={priority && index === 0}
              className="size-full object-cover"
            />
          </figure>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={previousLabel}
          disabled={edges.atStart}
          onClick={() => page(-1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={nextLabel}
          disabled={edges.atEnd}
          onClick={() => page(1)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
