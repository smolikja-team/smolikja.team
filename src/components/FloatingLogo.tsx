'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VIDEO_CONFIG } from '@/lib/constants';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const FALLBACK_LOGO_SRC = 'https://smolikja.team/assets/logo-white.svg';

const VIDEO_SRC = `${VIDEO_CONFIG.baseUrl}480p.mp4`;

export default function FloatingLogo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      prefersReducedMotion ||
      connection?.saveData ||
      connection?.effectiveType === 'slow-2g'
    ) {
      setUseStaticFallback(true);
      return;
    }

    setShouldLoadVideo(true);
  }, []);

  const handleVideoLoad = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    try {
      await video.play();
    } catch {
      // Muted inline video can still be blocked in stricter autoplay environments.
    } finally {
      setVideoLoaded(true);
      setVideoError(false);
    }
  }, [shouldLoadVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldLoadVideo]);

  return (
    <div className="floating-logo-stage" role="img" aria-label="smolikja team">
      {(useStaticFallback || !videoLoaded || videoError) && (
        <div className="floating-logo-stage__fallback">
          <Image
            src={FALLBACK_LOGO_SRC}
            alt=""
            className="floating-logo-stage__fallback-image"
            fill
            sizes="(max-width: 720px) 72px, 120px"
            priority
          />
        </div>
      )}

      {!useStaticFallback && shouldLoadVideo && !videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`floating-logo-stage__video ${videoLoaded ? 'is-loaded' : ''}`}
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={() => setVideoError(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
