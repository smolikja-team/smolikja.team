'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import type { Project, ProjectImage } from '@/types';

type ImageStatus = 'loading' | 'loaded' | 'error';

type GalleryMetrics = {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
  step: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const INITIAL_METRICS: GalleryMetrics = {
  scrollLeft: 0,
  scrollWidth: 0,
  clientWidth: 0,
  step: 0,
};

interface ProjectGalleryProps {
  project: Project;
}

function ProjectGallery({ project }: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    isDragging: boolean;
    startX: number;
    startScrollLeft: number;
    trackWidth: number;
  }>({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    trackWidth: 1,
  });

  const [imageStates, setImageStates] = useState<ImageStatus[]>(() =>
    project.images.map(() => 'loading'),
  );
  const [metrics, setMetrics] = useState<GalleryMetrics>(INITIAL_METRICS);

  useEffect(() => {
    setImageStates(project.images.map(() => 'loading'));
  }, [project.images]);

  const maxScroll = useMemo(
    () => Math.max(metrics.scrollWidth - metrics.clientWidth, 0),
    [metrics.clientWidth, metrics.scrollWidth],
  );

  const thumbWidthPercent = maxScroll
    ? (metrics.clientWidth / metrics.scrollWidth) * 100
    : 100;
  const thumbLeftPercent = maxScroll
    ? (metrics.scrollLeft / maxScroll) * (100 - thumbWidthPercent)
    : 0;

  const updateMetrics = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = gallery;
    const firstItem = gallery.querySelector<HTMLElement>('.gallery-image');

    let step = clientWidth * 0.8;
    if (firstItem) {
      const styles = window.getComputedStyle(gallery);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      const gap = Number.isNaN(gapValue) ? 0 : gapValue;
      step = firstItem.offsetWidth + gap;
    }

    setMetrics((previous) => {
      if (
        Math.abs(previous.scrollLeft - scrollLeft) < 1 &&
        previous.scrollWidth === scrollWidth &&
        previous.clientWidth === clientWidth &&
        Math.abs(previous.step - step) < 1
      ) {
        return previous;
      }

      return {
        scrollLeft,
        scrollWidth,
        clientWidth,
        step,
      };
    });
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    gallery.scrollLeft = 0;
    updateMetrics();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateMetrics())
        : null;

    resizeObserver?.observe(gallery);

    return () => {
      resizeObserver?.disconnect();
    };
  }, [updateMetrics]);

  const handleScroll = useCallback(() => {
    updateMetrics();
  }, [updateMetrics]);

  const scrollByStep = useCallback(
    (direction: 'prev' | 'next') => {
      const gallery = galleryRef.current;
      if (!gallery) {
        return;
      }

      const delta = direction === 'next' ? metrics.step : -metrics.step;
      const target = clamp(gallery.scrollLeft + delta, 0, maxScroll);

      gallery.scrollTo({ left: target, behavior: 'smooth' });
    },
    [maxScroll, metrics.step],
  );

  const handleTrackClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (thumbRef.current?.contains(event.target as Node)) {
        return;
      }

      const gallery = galleryRef.current;
      const track = trackRef.current;

      if (!gallery || !track) {
        return;
      }

      const rect = track.getBoundingClientRect();
      const clickRatio = (event.clientX - rect.left) / rect.width;
      const target = clamp(clickRatio * maxScroll, 0, maxScroll);

      gallery.scrollTo({ left: target, behavior: 'smooth' });
    },
    [maxScroll],
  );

  const handleThumbPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const gallery = galleryRef.current;
      const track = trackRef.current;
      if (!gallery || !track) {
        return;
      }

      event.preventDefault();
      const rect = track.getBoundingClientRect();
      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startScrollLeft: gallery.scrollLeft,
        trackWidth: rect.width || 1,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handleThumbPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const gallery = galleryRef.current;
      if (!gallery || !dragStateRef.current.isDragging) {
        return;
      }

      event.preventDefault();
      const { startX, startScrollLeft, trackWidth } = dragStateRef.current;
      const delta = event.clientX - startX;
      const ratio = trackWidth ? delta / trackWidth : 0;
      const target = clamp(startScrollLeft + ratio * maxScroll, 0, maxScroll);

      gallery.scrollLeft = target;
    },
    [maxScroll],
  );

  const stopDragging = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.isDragging) {
      dragStateRef.current.isDragging = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleThumbKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByStep('next');
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByStep('prev');
      } else if (event.key === 'Home') {
        event.preventDefault();
        galleryRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (event.key === 'End') {
        event.preventDefault();
        galleryRef.current?.scrollTo({ left: maxScroll, behavior: 'smooth' });
      }
    },
    [maxScroll, scrollByStep],
  );

  const handleImageLoaded = useCallback(
    (index: number) => () => {
      setImageStates((previous) => {
        if (previous[index] === 'loaded') {
          return previous;
        }

        const next = [...previous];
        next[index] = 'loaded';
        return next;
      });
      updateMetrics();
    },
    [updateMetrics],
  );

  const handleImageError = useCallback(
    (index: number) => () => {
      setImageStates((previous) => {
        if (previous[index] === 'error') {
          return previous;
        }
        const next = [...previous];
        next[index] = 'error';
        return next;
      });
      updateMetrics();
    },
    [updateMetrics],
  );

  const canScrollPrev = metrics.scrollLeft > 1;
  const canScrollNext = metrics.scrollLeft < maxScroll - 1;

  const thumbStyle = {
    width: `${thumbWidthPercent}%`,
    left: `${thumbLeftPercent}%`,
  };

  const wrapperClassName = [
    'gallery-wrapper',
    maxScroll > 0 ? 'gallery-wrapper--overflow' : '',
    canScrollPrev ? 'gallery-wrapper--can-scroll-prev' : '',
    canScrollNext ? 'gallery-wrapper--can-scroll-next' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName}>
      <div
        ref={galleryRef}
        className="project-gallery"
        data-gallery={project.id}
        role="region"
        aria-label={`Galerie projektu ${project.title}`}
        onScroll={handleScroll}
      >
        <div className="gallery-spacer" aria-hidden="true" role="presentation" />
        {project.images.map((image: ProjectImage, index: number) => {
          const status = imageStates[index];
          const containerClassName = `gallery-image ${status}`;
          const isPrimaryImage = project.id === projects[0]?.id && index === 0;

          return (
            <div key={image.src} className={containerClassName}>
              {status === 'loading' && (
                <div className="image-loading-placeholder">
                  <div className="image-loading-spinner" aria-hidden="true" />
                </div>
              )}

              {status === 'error' && (
                <div className="image-error-placeholder">
                  Obrázek se nepodařilo načíst.
                </div>
              )}

              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 75vw, 25rem"
                className="gallery-image-content"
                onLoad={handleImageLoaded(index)}
                onError={handleImageError(index)}
                style={status === 'error' ? { display: 'none' } : undefined}
                priority={isPrimaryImage}
              />
            </div>
          );
        })}
        <div className="gallery-spacer" aria-hidden="true" role="presentation" />
      </div>

      <div className="gallery-scrollbar-container">
        <button
          type="button"
          className="gallery-arrow gallery-arrow-prev"
          data-gallery={project.id}
          onClick={() => scrollByStep('prev')}
          aria-label={`Zobrazit předchozí snímek projektu ${project.title}`}
          disabled={!canScrollPrev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className="gallery-scrollbar"
          data-gallery={project.id}
          onClick={handleTrackClick}
          role="presentation"
        >
          <div
            ref={thumbRef}
            className="gallery-scrollbar-thumb"
            style={thumbStyle}
            role="slider"
            tabIndex={0}
            aria-label={`Posuvník galerie projektu ${project.title}`}
            aria-valuemin={0}
            aria-valuemax={Math.round(maxScroll)}
            aria-valuenow={Math.round(metrics.scrollLeft)}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onKeyDown={handleThumbKeyDown}
          />
        </div>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-next"
          data-gallery={project.id}
          onClick={() => scrollByStep('next')}
          aria-label={`Zobrazit další snímek projektu ${project.title}`}
          disabled={!canScrollNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="section section-projects">
      <div className="content-wrapper">
        <div className="section-content">
          <div className="projects-container">
            {projects.map((project) => (
              <div className="project-item" key={project.id}>
                <div className="project-copy">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <ProjectGallery project={project} />
                {project.secondaryDescription && (
                  <div className="project-copy project-copy--secondary">
                    <p className="project-description-2">
                      {project.secondaryDescription}
                      {project.secondaryLink ? (
                        <>
                          {' '}
                          <a
                            href={project.secondaryLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            {project.secondaryLink.label}
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
