'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VIDEO_CONFIG } from '@/lib/constants';
import { getConnectionSpeed, getOptimalVideoResolution, isIOS, supportsWebM } from '@/lib/utils';
import type { BrowserCapabilities } from '@/types';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const FALLBACK_LOGO_SRC = 'https://smolikja.team/assets/logo-white.svg';

const buildVideoUrls = (resolution: string) => ({
  webm: `${VIDEO_CONFIG.baseUrl}${resolution}.webm`,
  mp4: `${VIDEO_CONFIG.baseUrl}${resolution}.mp4`,
});

const INITIAL_CAPABILITIES: BrowserCapabilities = {
  supportsWebM: false,
  isIOS: false,
  connectionSpeed: 'fast',
};

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [capabilities, setCapabilities] = useState<BrowserCapabilities>(INITIAL_CAPABILITIES);
  const [videoResolution, setVideoResolution] = useState<string>('1080p');
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [useStaticFallback, setUseStaticFallback] = useState<boolean>(false);
  const [hintMounted, setHintMounted] = useState<boolean>(false);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(false);

  const videoUrls = buildVideoUrls(videoResolution);
  const hintTimeoutRef = useRef<number | null>(null);
  const hintActivatedRef = useRef<boolean>(false);

  const scheduleScrollHint = useCallback(() => {
    if (hintActivatedRef.current) {
      return;
    }

    hintActivatedRef.current = true;
    setHintMounted(true);
    hintTimeoutRef.current = window.setTimeout(() => {
      setShowScrollHint(true);
    }, 8_000);
  }, []);

  useEffect(() => {
    const detectedCapabilities: BrowserCapabilities = {
      supportsWebM: supportsWebM(),
      isIOS: isIOS(),
      connectionSpeed: getConnectionSpeed(),
    };

    setCapabilities(detectedCapabilities);
    setVideoResolution(getOptimalVideoResolution(detectedCapabilities.connectionSpeed));

    if (detectedCapabilities.connectionSpeed === 'slow') {
      const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
      if (connection?.saveData || connection?.effectiveType === 'slow-2g') {
        setUseStaticFallback(true);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (useStaticFallback) return;

    const section = sectionRef.current;
    if (!section) {
      setShouldLoadVideo(true);
      scheduleScrollHint();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            scheduleScrollHint();
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [scheduleScrollHint, useStaticFallback]);

  useEffect(() => {
    if (useStaticFallback) return;

    const updateResolution = () => {
      setVideoResolution(getOptimalVideoResolution(capabilities.connectionSpeed));
    };

    updateResolution();
    window.addEventListener('resize', updateResolution);
    return () => window.removeEventListener('resize', updateResolution);
  }, [capabilities.connectionSpeed, useStaticFallback]);

  const handleVideoLoad = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) {
      return;
    }

    try {
      if (capabilities.isIOS) {
        const playPromise = video.play();
        if (playPromise) {
          await playPromise;
        }
      } else {
        await video.play();
      }
    } catch {
      // Fall back to user interaction for autoplay-restricted environments.
    } finally {
      setVideoLoaded(true);
      setVideoError(false);
    }
  }, [capabilities.isIOS, shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || videoLoaded || useStaticFallback) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.readyState >= 2) {
      void handleVideoLoad();
      return;
    }

    video.addEventListener('loadeddata', handleVideoLoad, { once: true });
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, [handleVideoLoad, shouldLoadVideo, useStaticFallback, videoLoaded]);

  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!hintMounted) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 32) {
        if (hintTimeoutRef.current) {
          clearTimeout(hintTimeoutRef.current);
          hintTimeoutRef.current = null;
        }
        setShowScrollHint(false);
        setHintMounted(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hintMounted]);

  useEffect(() => {
    if (useStaticFallback || videoError) {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
      setShowScrollHint(false);
      setHintMounted(false);
    }
  }, [useStaticFallback, videoError]);

  const canDisplayScrollHint = hintMounted && !useStaticFallback && !videoError;

  return (
    <section ref={sectionRef} className="section section-intro">
      {(useStaticFallback || !shouldLoadVideo || videoError) && (
        <div className="logo-fallback" aria-hidden={!useStaticFallback}>
          <div className="logo-content">
            <div className="logo-container">
              <Image
                src={FALLBACK_LOGO_SRC}
                alt="Portfolio Logo"
                className="portfolio-logo"
                fill
                sizes="(max-width: 479px) 50vw, (max-width: 767px) 60vw, (max-width: 991px) 70vw, 40vw"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="simple-arrow-down" />
          </div>
        </div>
      )}

      {!useStaticFallback && shouldLoadVideo && !videoError && (
        <video
          ref={videoRef}
          key={videoResolution}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={`foreground-video ${videoLoaded ? 'video-loaded' : 'video-loading'}`}
          controls={false}
          disablePictureInPicture
          onCanPlay={handleVideoLoad}
          onError={() => setVideoError(true)}
          onStalled={() => videoRef.current?.load()}
        >
          {capabilities.isIOS ? (
            <source src={videoUrls.mp4} type="video/mp4" />
          ) : (
            <>
              {capabilities.supportsWebM && <source src={videoUrls.webm} type="video/webm" />}
              <source src={videoUrls.mp4} type="video/mp4" />
            </>
          )}
          Váš prohlížeč nepodporuje přehrávání videa.
        </video>
      )}

      {canDisplayScrollHint && (
        <div className={`scroll-hint ${showScrollHint ? 'visible' : ''}`}>
          <span className="scroll-hint__text">Scrollujte</span>
          <span className="scroll-hint__arrow" aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
