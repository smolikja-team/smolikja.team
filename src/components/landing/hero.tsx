import { ArrowDownIcon } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionary";
import { HeroVideo } from "./hero-video";

export const HERO_ID = "hero";

/**
 * Full-viewport opening: nothing but the logo loop and, after a few seconds,
 * a quiet nudge to scroll. The site header stays hidden while this is in view.
 */
export function Hero({ copy, nextHref }: { copy: Dictionary["hero"]; nextHref: string }) {
  return (
    <section id={HERO_ID} className="relative h-dvh min-h-[28rem] overflow-hidden bg-background">
      <HeroVideo copy={copy} />
      <a
        href={nextHref}
        className="animate-hint-in absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 rounded-md px-3 py-2 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {copy.scrollHint}
        <ArrowDownIcon aria-hidden="true" className="size-4 motion-safe:animate-nudge" />
      </a>
    </section>
  );
}
