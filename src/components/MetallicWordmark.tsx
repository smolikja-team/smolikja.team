'use client';

import { useMemo } from 'react';
import MetallicPaint from '@/components/reactbits/MetallicPaint';

type MetallicWordmarkProps = {
  label: string;
  className?: string;
};

export default function MetallicWordmark({ label, className }: MetallicWordmarkProps) {
  const imageSrc = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="960" height="220" viewBox="0 0 960 220">
        <rect width="100%" height="100%" fill="white" />
        <text
          x="50%"
          y="52%"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="black"
          font-family="Arial Black, Arial, sans-serif"
          font-size="76"
          font-weight="700"
          letter-spacing="10"
        >
          ${label}
        </text>
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }, [label]);

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span className="metallic-wordmark__visual" aria-hidden="true">
        <MetallicPaint
          imageSrc={imageSrc}
          seed={42}
          scale={4}
          patternSharpness={1}
          noiseScale={0.5}
          speed={0.3}
          liquid={0.75}
          mouseAnimation={false}
          brightness={2}
          contrast={0.5}
          refraction={0.01}
          blur={0.015}
          chromaticSpread={2}
          fresnel={1}
          angle={0}
          waveAmplitude={1}
          distortion={1}
          contour={0.2}
          lightColor="#ffffff"
          darkColor="#040506"
          tintColor="#efb67a"
        />
      </span>
    </span>
  );
}
