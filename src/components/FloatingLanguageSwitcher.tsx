'use client';

import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const TARGET_SECTION_IDS = ['projects', 'about'] as const;
type TargetId = (typeof TARGET_SECTION_IDS)[number];

const OBSERVER_THRESHOLDS = Array.from({ length: 21 }, (_, index) => index / 20);
const VISIBLE_PORTION = 0.5;

export default function FloatingLanguageSwitcher() {
  const [isVisible, setIsVisible] = useState(false);
  const visibilityStateRef = useRef<Record<TargetId, boolean>>({
    projects: false,
    about: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let hasStateChanged = false;

        entries.forEach((entry) => {
          const sectionId = entry.target.id as TargetId;
          if (!TARGET_SECTION_IDS.includes(sectionId)) {
            return;
          }

          const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
          const visibleHeight = entry.intersectionRect.height;
          const isHalfViewport =
            entry.isIntersecting && visibleHeight >= viewportHeight * VISIBLE_PORTION;

          if (visibilityStateRef.current[sectionId] !== isHalfViewport) {
            visibilityStateRef.current[sectionId] = isHalfViewport;
            hasStateChanged = true;
          }
        });

        if (hasStateChanged) {
          const shouldShow = Object.values(visibilityStateRef.current).some(Boolean);
          setIsVisible(shouldShow);
        }
      },
      { threshold: OBSERVER_THRESHOLDS },
    );

    let animationFrameId: number | null = null;

    const observeSections = () => {
      const sections = TARGET_SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (section): section is HTMLElement => Boolean(section),
      );

      if (sections.length === 0) {
        animationFrameId = window.requestAnimationFrame(observeSections);
        return;
      }

      sections.forEach((section) => observer.observe(section));
    };

    observeSections();

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageSwitcher
      className="language-switcher--floating"
      isActive={isVisible}
    />
  );
}
