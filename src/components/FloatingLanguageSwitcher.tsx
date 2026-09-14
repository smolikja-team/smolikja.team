'use client';

import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { FLOATING_UI_REVEAL_RATIO } from '@/lib/constants';

export default function FloatingLanguageSwitcher() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * FLOATING_UI_REVEAL_RATIO);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return <LanguageSwitcher className="language-switcher--floating" isActive={isVisible} />;
}
