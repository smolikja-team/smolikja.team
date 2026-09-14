'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { formatMessage } from '@/lib/i18n';
import type { Language, Project } from '@/types';

type ProjectCarouselProps = {
  project: Project;
  language: Language;
};

type CarouselCopy = {
  region: string;
  hint: string;
  previous: string;
  next: string;
  slide: string;
  dot: string;
};

const CAROUSEL_COPY: Record<Language, CarouselCopy> = {
  cs: {
    region: 'Screenshot galerie projektu {{title}}',
    hint: 'Tažením, swipem nebo kolečkem projděte jednotlivé obrazovky.',
    previous: 'Zobrazit předchozí screenshot projektu {{title}}',
    next: 'Zobrazit další screenshot projektu {{title}}',
    slide: 'Screenshot {{index}} z {{total}} projektu {{title}}',
    dot: 'Přejít na screenshot {{index}} projektu {{title}}',
  },
  en: {
    region: 'Screenshot gallery for {{title}}',
    hint: 'Swipe, drag, or use the wheel to move through the screens.',
    previous: 'Show previous screenshot for {{title}}',
    next: 'Show next screenshot for {{title}}',
    slide: 'Screenshot {{index}} of {{total}} for {{title}}',
    dot: 'Go to screenshot {{index}} for {{title}}',
  },
};

export default function ProjectCarousel({
  project,
  language,
}: ProjectCarouselProps) {
  const projectTitle = project.title[language];
  const copy = CAROUSEL_COPY[language];
  const plugins = useMemo(() => [WheelGesturesPlugin({ forceWheelAxis: 'x' })], []);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      loop: false,
      slidesToScroll: 1,
    },
    plugins,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(() =>
    project.images.map(() => false),
  );

  useEffect(() => {
    setLoadedImages(project.images.map(() => false));
  }, [project.images]);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateCarouselState();
    emblaApi.on('reInit', updateCarouselState);
    emblaApi.on('select', updateCarouselState);

    return () => {
      emblaApi.off('reInit', updateCarouselState);
      emblaApi.off('select', updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  const handleImageLoaded = useCallback((index: number) => {
    setLoadedImages((previous) => {
      if (previous[index]) {
        return previous;
      }

      const next = [...previous];
      next[index] = true;
      return next;
    });
  }, []);

  const progressValue =
    scrollSnaps.length > 1 ? selectedIndex / (scrollSnaps.length - 1) : 0;

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={formatMessage(copy.region, { title: projectTitle })}
    >
      <div className="project-carousel__meta">
        <p className="project-carousel__hint">{copy.hint}</p>
        <div className="project-carousel__status">
          <span className="project-carousel__count">
            {selectedIndex + 1}/{project.images.length}
          </span>
          <span className="project-carousel__progress" aria-hidden="true">
            <span
              className="project-carousel__progress-bar"
              style={{ transform: `scaleX(${progressValue || 0.04})` }}
            />
          </span>
        </div>
      </div>

      <div className="embla">
        <div ref={emblaRef} className="embla__viewport">
          <div className="embla__container">
            {project.images.map((image, index) => {
              const isSelected = selectedIndex === index;
              const isLoaded = loadedImages[index];
              const slideClassName = [
                'embla__slide',
                isSelected ? 'is-selected' : '',
                isLoaded ? 'is-loaded' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={image.src}
                  className={slideClassName}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={formatMessage(copy.slide, {
                    index: index + 1,
                    total: project.images.length,
                    title: projectTitle,
                  })}
                >
                  <div className="project-device">
                    {!isLoaded && <div className="project-device__placeholder" aria-hidden="true" />}
                    <div className="project-device__screen">
                      <Image
                        src={image.src}
                        alt={image.alt[language]}
                        fill
                        sizes="(max-width: 767px) 78vw, (max-width: 1200px) 38vw, 420px"
                        quality={88}
                        className="project-device__image"
                        onLoad={() => handleImageLoaded(index)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="project-carousel__footer">
        <div className="project-carousel__buttons">
          <button
            type="button"
            className="carousel-button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label={formatMessage(copy.previous, { title: projectTitle })}
            disabled={!canScrollPrev}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button
            type="button"
            className="carousel-button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label={formatMessage(copy.next, { title: projectTitle })}
            disabled={!canScrollNext}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        <div className="project-carousel__dots" role="group" aria-label={projectTitle}>
          {scrollSnaps.map((_, index) => (
            <button
              key={`${project.id}-dot-${index}`}
              type="button"
              className={`carousel-dot ${selectedIndex === index ? 'is-active' : ''}`}
              aria-label={formatMessage(copy.dot, {
                index: index + 1,
                title: projectTitle,
              })}
              aria-pressed={selectedIndex === index}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
