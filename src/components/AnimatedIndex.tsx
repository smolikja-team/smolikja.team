'use client';

import CountUp from '@/components/reactbits/CountUp';

type AnimatedIndexProps = {
  value: number;
  className?: string;
  duration?: number;
};

export default function AnimatedIndex({ value, className, duration = 1 }: AnimatedIndexProps) {
  const paddedValue = String(value).padStart(2, '0');

  return (
    <span aria-label={paddedValue}>
      <span className={`${className ?? ''} animated-index__value`.trim()} aria-hidden="true">
        {value < 10 ? <span className="animated-index__prefix">0</span> : null}
        <CountUp from={0} to={value} duration={duration} className="animated-index__count" />
      </span>
    </span>
  );
}
