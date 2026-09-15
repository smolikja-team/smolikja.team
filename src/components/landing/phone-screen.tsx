import Image from "next/image";

import type { ProjectImage } from "@/config/projects";
import { cn } from "@/lib/utils";

/**
 * One real application screen. The screenshots already carry their status
 * bars, so no device frame is drawn around them — just rounded corners and a
 * hairline so the light screens separate from light surfaces.
 */
export function PhoneScreen({
  image,
  alt,
  sizes,
  priority = false,
  className,
}: {
  image: ProjectImage;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full rounded-2xl bg-card ring-1 ring-foreground/10", className)}
    />
  );
}
