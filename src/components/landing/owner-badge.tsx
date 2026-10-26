import Image from "next/image";

import { ownerPhotos } from "@/config/assets";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The owner's face and name with one supporting line. The photo is decorative
 * here: the name right next to it already says who it is.
 */
export function OwnerBadge({
  detail,
  eager = false,
  className,
}: {
  detail: string;
  /** Load immediately — for the badge in the first viewport. */
  eager?: boolean;
  className?: string;
}) {
  const { portrait } = ownerPhotos;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={portrait.src}
        alt=""
        width={portrait.width}
        height={portrait.height}
        sizes="48px"
        loading={eager ? "eager" : undefined}
        className="size-12 shrink-0 rounded-full object-cover ring-1 ring-foreground/10"
      />
      <p className="flex flex-col leading-tight">
        <span className="font-semibold">{siteConfig.owner.name}</span>
        <span className="text-sm text-muted-foreground">{detail}</span>
      </p>
    </div>
  );
}
