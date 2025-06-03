'use client';

import { useEffect } from 'react';

export default function SafariDetection() {
  useEffect(() => {
    // Detect Safari browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isSafari) {
      document.documentElement.classList.add('is-safari');
    }
  }, []);

  // This component doesn't render anything
  return null;
}
