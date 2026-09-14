'use client';

import { useEffect } from 'react';
import { isSafari } from '@/lib/browser';

export default function SafariDetection() {
  useEffect(() => {
    if (isSafari()) {
      document.documentElement.classList.add('is-safari');
    }
  }, []);

  return null;
}
