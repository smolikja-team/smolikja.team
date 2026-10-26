import Image from "next/image";

import type { WorkImage } from "@/config/work";
import { cn } from "@/lib/utils";

/**
 * One real application screen as a card: rounded like a device screen, with a
 * soft shadow and hairline ring, no drawn bezel (the screenshots carry their
 * own status bars). The elliptical radius keeps the corners circular at any
 * width for the ≈ 9:19.5 screens.
 */
export function ScreenCard({
  image,
  alt,
  sizes,
  preload = false,
  className,
}: {
  image: WorkImage;
  alt: string;
  sizes: string;
  /** Preload as the likely LCP element (the front hero card). */
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      preload={preload}
      className={cn(
        "block h-auto w-full rounded-[12%/5.5%] bg-card shadow-xl ring-1 shadow-foreground/15 ring-foreground/10",
        className,
      )}
    />
  );
}
