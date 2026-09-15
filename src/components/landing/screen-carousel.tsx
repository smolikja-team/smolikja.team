"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { ProjectImage } from "@/config/projects";
import { format } from "@/i18n/format";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./phone-frame";

/**
 * Application screens as an Embla carousel: the next slide peeks in from the
 * right, slides respond to drag, touch, trackpad and arrow keys, and the
 * buttons and dots below mirror the position. Every screen is a real,
 * unaltered screenshot.
 */
export function ScreenCarousel({
  images,
  alt,
  label,
  slideLabel,
  previousLabel,
  nextLabel,
}: {
  images: readonly ProjectImage[];
  alt: Record<string, string>;
  label: string;
  /** Template with `{index}` and `{count}`. */
  slideLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [api, setApi] = useState<CarouselApi>();

  // The selected snap lives in Embla; subscribe to it as an external store so
  // the dots follow without setting state inside an effect.
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange);
      api.on("reInit", onChange);
      return () => {
        api.off("select", onChange);
        api.off("reInit", onChange);
      };
    },
    [api],
  );
  const selected = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      plugins={[WheelGesturesPlugin()]}
      aria-label={label}
      className="flex flex-col gap-5"
    >
      <CarouselContent className="-ml-4 sm:-ml-5">
        {images.map((image, index) => (
          <CarouselItem
            key={image.id}
            aria-label={format(slideLabel, { index: index + 1, count: images.length })}
            className="basis-[70%] pl-4 sm:basis-[44%] sm:pl-5 lg:basis-[36%]"
          >
            <PhoneFrame
              image={image}
              alt={alt[image.id]}
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 44vw, 70vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center gap-4">
        <CarouselPrevious
          aria-label={previousLabel}
          size="icon-lg"
          className="static size-11 translate-y-0"
        />
        <CarouselNext aria-label={nextLabel} size="icon-lg" className="static size-11 translate-y-0" />
        <ol className="ml-2 flex items-center gap-2" aria-hidden="true">
          {images.map((image, index) => (
            <li
              key={image.id}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === selected ? "bg-foreground" : "bg-foreground/20",
              )}
            />
          ))}
        </ol>
      </div>
    </Carousel>
  );
}
