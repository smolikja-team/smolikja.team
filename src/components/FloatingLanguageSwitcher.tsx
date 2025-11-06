'use client';

import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const TARGET_SECTION_IDS = ['projects', 'about'] as const;

type TargetId = (typeof TARGET_SECTION_IDS)[number];

export default function FloatingLanguageSwitcher() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const intersectionMap = new Map<TargetId, boolean>(
      TARGET_SECTION_IDS.map((id) => [id, false]),
    );

    const updateVisibility = () => {
      const shouldShow =
        intersectionMap.get('projects') === true || intersectionMap.get('about') === true;
      setIsVisible(shouldShow);
    };

    const sections = TARGET_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      setIsVisible(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id as TargetId;
          if (!TARGET_SECTION_IDS.includes(sectionId)) {
            return;
          }

          const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
          const visibleHeight = entry.intersectionRect.height;
          const isHalfViewport = entry.isIntersecting && visibleHeight >= viewportHeight * 0.5;

          intersectionMap.set(sectionId, isHalfViewport);
        });

        updateVisibility();
      },
      {
        threshold: Array.from({ length: 21 }, (_, index) => index / 20),
      },
    );

    sections.forEach((section) => observer.observe(section));

    updateVisibility();

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageSwitcher
      className="language-switcher--floating"
      isActive={isVisible}
    />
  );
}
