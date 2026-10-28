import Image from "next/image";

import type { WorkImage } from "@/config/work";
import { cn } from "@/lib/utils";

/**
 * A real application screen inside a front-view mockup of a current iPhone
 * Pro (iPhone 17 Pro proportions: 71.9 × 150.0 mm body, 1206 × 2622 px
 * screen): metal band with side buttons, black glass border and the Dynamic
 * Island. Everything is percentage-based, so the mockup scales with its
 * width; give it a width and it keeps the device's aspect ratio.
 *
 * Some screenshots already contain an island drawn by the capture tool; the
 * drawn one sits at the device's real position and covers it exactly.
 *
 * The screen shows either a real application screenshot (`image`) or drawn
 * content (`children`), which fills the screen under the island.
 */
export function DeviceFrame(
  props: { className?: string } & (
    | {
        image: WorkImage;
        alt: string;
        sizes: string;
        /**
         * Load immediately with high priority — for the hero devices, either
         * of which can be the largest element in the first viewport.
         */
        eager?: boolean;
        /** Optimizer quality; must be listed in `images.qualities` (next.config.ts). */
        quality?: number;
        children?: never;
      }
    | { children: React.ReactNode; image?: never }
  ),
) {
  const { className } = props;

  return (
    <div
      className={cn(
        "relative aspect-[719/1500] rounded-[16%/7.6%] bg-linear-to-br from-device-edge via-device-frame to-device-edge p-[1.1%] shadow-2xl shadow-foreground/25",
        className,
      )}
    >
      {/* Side buttons: action button and volume on the left, side button and
          Camera Control on the right. */}
      <span aria-hidden="true" className="absolute top-[17%] -left-[0.8%] h-[4%] w-[1.1%] rounded-l-full bg-device-frame" />
      <span aria-hidden="true" className="absolute top-[24%] -left-[0.8%] h-[7.5%] w-[1.1%] rounded-l-full bg-device-frame" />
      <span aria-hidden="true" className="absolute top-[33.5%] -left-[0.8%] h-[7.5%] w-[1.1%] rounded-l-full bg-device-frame" />
      <span aria-hidden="true" className="absolute top-[26%] -right-[0.8%] h-[11%] w-[1.1%] rounded-r-full bg-device-frame" />
      <span aria-hidden="true" className="absolute top-[56%] -right-[0.8%] h-[6%] w-[1.1%] rounded-r-full bg-device-frame" />

      <div className="relative h-full w-full rounded-[15%/7.2%] bg-device-glass p-[3.2%]">
        <div className="relative h-full w-full overflow-hidden rounded-[12%/5.5%] bg-card">
          {props.image ? (
            <Image
              src={props.image.src}
              alt={props.alt}
              fill
              sizes={props.sizes}
              quality={props.quality}
              loading={props.eager ? "eager" : undefined}
              fetchPriority={props.eager ? "high" : undefined}
              className="object-cover object-top"
            />
          ) : (
            props.children
          )}
          <span
            aria-hidden="true"
            className="absolute top-[1.3%] left-1/2 h-[4.2%] w-[31%] -translate-x-1/2 rounded-full bg-device-glass"
          />
        </div>
      </div>
    </div>
  );
}
