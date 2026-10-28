import { ArrowRightIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { heroComposition } from "@/config/work";
import type { Dictionary } from "@/i18n/dictionary";
import { CtaLink } from "./cta-link";
import { FreeConsultationNote } from "./free-consultation-note";
import { HeroDeviceStack } from "./hero-device-stack";
import { OwnerBadge } from "./owner-badge";
import { Reveal } from "./reveal";

/**
 * Asymmetric opening: who is speaking, a short offer, the action and the free
 * consultation on the left; two real screens in iPhone mockups on the right,
 * the back one shuffling to the front when pointed at. On small screens the
 * offer and action come first and the devices follow.
 */
export function Hero({
  copy,
  cta,
  screens,
}: {
  copy: Dictionary["hero"];
  /** The primary action label — shared with the header so it reads the same everywhere. */
  cta: string;
  /** Alt text of the work screens shown in the stack. */
  screens: Dictionary["work"]["images"];
}) {
  const { primary, secondary } = heroComposition;

  return (
    <section className="flex min-h-[calc(100lvh-4rem)] flex-col justify-center">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-14 px-5 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,13fr)_minmax(0,11fr)] lg:items-center lg:gap-16 lg:py-20">
        <div className="@container flex max-w-2xl flex-col gap-7">
          <OwnerBadge detail={copy.role} eager />
          {/* Sized to the column, not the window: the wide display face keeps
              the title to three lines at every width (about 50 px at most). */}
          <h1 className="text-[7.4cqw] leading-display font-semibold tracking-display text-balance">
            {copy.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl">
            {copy.text}
          </p>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaLink href={siteConfig.ctaHref}>{cta}</CtaLink>
              <a
                href="#work"
                className="inline-flex min-h-12 items-center gap-1.5 rounded-md font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.secondary}
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </a>
            </div>
            <FreeConsultationNote lead={copy.freeConsultation} detail={copy.reassurance} />
          </div>
        </div>

        <Reveal>
          <HeroDeviceStack
            left={{ image: secondary, alt: screens[secondary.id].alt }}
            right={{ image: primary, alt: screens[primary.id].alt }}
            label={copy.compositionAria}
          />
        </Reveal>
      </div>
    </section>
  );
}
