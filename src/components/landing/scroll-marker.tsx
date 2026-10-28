"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Thickness of the stroke; it sits below the descenders, clear of the letters. */
const STROKE = "0.16em";

/**
 * A key phrase with a stroke under it that draws from left to right as the
 * reader scrolls: empty while the phrase sits at 85 % of the window's
 * height, complete once it has risen to 35 %. The stroke follows the scroll
 * position, so scrolling back erases it again. With reduced motion the
 * stroke is simply there (the class's full width); without JavaScript the
 * phrase keeps its weight but has no stroke.
 */
export function ScrollMarker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] });
  const backgroundSize = useTransform(scrollYProgress, (progress) => `${progress * 100}% ${STROKE}`);

  return (
    <motion.strong
      ref={ref}
      style={{ backgroundSize: reduceMotion ? `100% ${STROKE}` : backgroundSize }}
      className="bg-linear-to-r from-highlight to-highlight bg-no-repeat pb-[0.12em] font-semibold text-foreground [background-position:0_100%]"
    >
      {children}
    </motion.strong>
  );
}
