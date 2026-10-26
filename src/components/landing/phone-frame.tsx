import Image from "next/image";

import type { ProjectImage } from "@/config/projects";
import { cn } from "@/lib/utils";

/**
 * One real application screen inside a slim device bezel. The screenshots
 * already carry their status bars and cutouts, so the frame is only the dark
 * body around the glass — no second notch is drawn.
 */
export function PhoneFrame({
  image,
  alt,
  sizes,
  preload = false,
  className,
  screenClassName,
}: {
  image: ProjectImage;
  alt: string;
  sizes: string;
  /** Preload as the likely LCP element (the hero screen). */
  preload?: boolean;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2.5rem] bg-foreground p-1.5 shadow-[0_24px_48px_-20px_rgba(23,28,38,0.45)] ring-1 ring-white/10 ring-inset",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={preload}
        className={cn("block h-auto w-full rounded-[2.1rem] bg-card", screenClassName)}
      />
    </div>
  );
}
