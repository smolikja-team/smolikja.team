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
import type { WorkImage } from "@/config/work";
import type { WorkImageCopy, WorkImageId } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { ScreenCard } from "./screen-card";

/**
 * Application screens as a full-bleed Embla carousel: the strip starts at the
 * page's content edge and runs to the edges of the window, slides respond to
 * drag, touch, trackpad and arrow keys, and a thin progress line plus square
 * buttons sit below. Each screen carries a short caption naming the kind of
 * app, never the client.
 *
 * `--page-inset` mirrors the page container (`max-w-6xl` with `px-5`/`px-6`)
 * so the first slide and the controls line up with the content above.
 */
export function ScreenCarousel({
  images,
  copy,
  label,
  slideLabel,
  previousLabel,
  nextLabel,
}: {
  images: readonly WorkImage[];
  copy: Record<WorkImageId, WorkImageCopy>;
  label: string;
  /** Template with `{index}` and `{count}`. */
  slideLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [api, setApi] = useState<CarouselApi>();

  // Scroll progress lives in Embla; subscribe to it as an external store so
  // the progress line follows without setting state inside an effect.
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("scroll", onChange);
      api.on("reInit", onChange);
      return () => {
        api.off("scroll", onChange);
        api.off("reInit", onChange);
      };
    },
    [api],
  );
  const progress = useSyncExternalStore(
    subscribe,
    () => Math.min(1, Math.max(0, api?.scrollProgress() ?? 0)),
    () => 0,
  );

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      plugins={[WheelGesturesPlugin()]}
      aria-label={label}
      className="mx-[calc(50%-50vw)] flex flex-col gap-6 [--page-inset:1.25rem] sm:[--page-inset:max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]"
    >
      <CarouselContent className="ml-0 gap-4 py-2 ps-(--page-inset) pe-(--page-inset) sm:gap-5">
        {images.map((image, index) => (
          <CarouselItem
            key={image.id}
            aria-label={format(slideLabel, { index: index + 1, count: images.length })}
            className="basis-auto pl-0"
          >
            <figure className="flex w-[13rem] flex-col gap-3 sm:w-[15rem]">
              <ScreenCard
                image={image}
                alt={copy[image.id].alt}
                sizes="(min-width: 640px) 240px, 208px"
                className="shadow-lg"
              />
              <figcaption className="text-sm text-pretty text-muted-foreground">
                {copy[image.id].caption}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center gap-6 px-(--page-inset)">
        <div aria-hidden="true" className="relative h-px max-w-xs flex-1 bg-border">
          <div
            className="absolute -top-px left-0 h-0.5 w-1/4 bg-foreground"
            style={{ translate: `${progress * 300}% 0` }}
          />
        </div>
        <div className="ml-auto flex gap-2">
          <CarouselPrevious
            aria-label={previousLabel}
            size="icon-lg"
            className="static size-11 translate-y-0 rounded-xl"
          />
          <CarouselNext
            aria-label={nextLabel}
            size="icon-lg"
            className="static size-11 translate-y-0 rounded-xl"
          />
        </div>
      </div>
    </Carousel>
  );
}
