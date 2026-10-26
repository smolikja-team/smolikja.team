"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

/**
 * Fade-and-rise scroll reveal, used once — for the hero devices — so the page
 * has a single orchestrated entrance rather than motion on every section. The
 * markup is the same on server and client; with reduced motion, `MotionConfig`
 * keeps only the fade and drops the movement.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
