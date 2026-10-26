"use client";

import { useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";

import type { WorkImage } from "@/config/work";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";

type Side = "left" | "right";

const DURATION = 0.7;
/** Moment of widest separation, when the layering flips. */
const SWAP_AT = 0.45;

/**
 * Card-shuffle swap: both devices first pull apart (each towards its own
 * side), swap layering at the widest point, then slide back — the incoming
 * one growing to full size, the outgoing one shrinking behind it. Defined
 * once, outside the component, so the animate prop stays stable.
 */
const variants: Variants = {
  front: (direction: number) => ({
    x: ["0%", `${direction * 22}%`, "0%"],
    scale: [0.8, 0.88, 1],
    zIndex: 2,
    transition: {
      duration: DURATION,
      ease: [0.22, 1, 0.36, 1],
      times: [0, SWAP_AT, 1],
      zIndex: { delay: DURATION * SWAP_AT, duration: 0 },
    },
  }),
  back: (direction: number) => ({
    x: ["0%", `${direction * 22}%`, "0%"],
    scale: [1, 0.9, 0.8],
    zIndex: 1,
    transition: {
      duration: DURATION,
      ease: [0.22, 1, 0.36, 1],
      times: [0, SWAP_AT, 1],
      zIndex: { delay: DURATION * SWAP_AT, duration: 0 },
    },
  }),
};

const SIZES = "(min-width: 1024px) 250px, (min-width: 640px) 215px, 170px";

/**
 * Two real screens in iPhone mockups, side by side on one line: the front one
 * at full size, the back one smaller behind it. Pointing at the back device
 * (or tapping it on touch screens) shuffles it to the front with an animated
 * swap. Purely presentational — both screens keep their alt text.
 */
export function HeroDeviceStack({
  left,
  right,
  label,
}: {
  left: { image: WorkImage; alt: string };
  right: { image: WorkImage; alt: string };
  label: string;
}) {
  const [front, setFront] = useState<Side>("right");

  const devices = [
    { side: "left" as const, direction: -1, position: "left-0", ...left },
    { side: "right" as const, direction: 1, position: "right-0", ...right },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="group"
        aria-label={label}
        // The container is exactly one full-size device tall: each device is
        // 62% of the width and 1500/719 as tall as it is wide.
        className="relative mx-auto aspect-[100/129.35] w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[25rem]"
      >
        {devices.map((device) => (
          <motion.div
            key={device.side}
            custom={device.direction}
            variants={variants}
            initial={false}
            animate={front === device.side ? "front" : "back"}
            onHoverStart={() => setFront(device.side)}
            onTap={() => setFront(device.side)}
            className={cn("absolute top-0 w-[62%]", device.position)}
          >
            <DeviceFrame
              image={device.image}
              alt={device.alt}
              sizes={SIZES}
              eager
            />
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
