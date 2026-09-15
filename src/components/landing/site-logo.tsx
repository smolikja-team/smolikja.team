import { headerLogoVideo } from "@/config/video";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/icons/brand-logo";

/**
 * Animated wordmark for the header: the rotating-logo video (white logo on a
 * black frame) is inverted and multiplied onto the header, which turns its
 * black background transparent and the logo dark. The frame is taller than
 * the header, so the wrapper crops it to the band the logo rotates in.
 * Visitors who prefer reduced motion get the static wordmark instead.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-16 w-[9.75rem] items-center overflow-hidden", className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className="h-[5.5rem] w-auto max-w-none mix-blend-multiply [filter:invert(1)] motion-reduce:hidden"
      >
        {headerLogoVideo.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <BrandLogo className="hidden h-5 w-auto motion-reduce:block" />
    </span>
  );
}
