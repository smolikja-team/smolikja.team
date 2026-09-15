import { ArrowRightIcon } from "lucide-react";

import { heroComposition } from "@/config/projects";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { CtaLink } from "./cta-link";
import { PhoneScreen } from "./phone-screen";
import { Reveal } from "./reveal";

/**
 * Asymmetric opening: the offer, the action and its terms on the left; one
 * large real screen with a smaller supporting screen on the right. On small
 * screens the offer and action come first and only the large screen follows.
 */
export function Hero({
  copy,
  cta,
  projectCopy,
}: {
  copy: Dictionary["hero"];
  /** The primary action label — shared with the header so it reads the same everywhere. */
  cta: string;
  projectCopy: Dictionary["projects"]["items"];
}) {
  const { primary, secondary } = heroComposition;

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:py-20">
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-[2.625rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {copy.title}
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          {copy.text}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <CtaLink href={siteConfig.ctaHref}>{cta}</CtaLink>
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center gap-1.5 rounded-md font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {copy.secondary}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </a>
        </div>
        <p className="text-pretty text-muted-foreground">
          <span className="font-medium text-foreground">{copy.freeConsultation}</span>{" "}
          {copy.reassurance}
        </p>
      </div>

      <Reveal className="flex flex-col gap-3">
        <div role="group" aria-label={copy.compositionAria} className="relative">
          {/* The large screen rises out of the composition's bottom edge. */}
          <div className="h-[26rem] overflow-hidden rounded-3xl bg-secondary px-8 pt-8 sm:h-[30rem] sm:px-12 sm:pt-10">
            <div className="mr-2 ml-auto max-w-[15rem] sm:mr-6 sm:max-w-[16.5rem] lg:mr-8">
              <PhoneScreen
                image={primary.image}
                alt={projectCopy[primary.project].images[primary.image.id]}
                sizes="(min-width: 640px) 264px, 240px"
                priority
                className="rounded-t-2xl rounded-b-none shadow-[0_24px_60px_-24px_rgba(23,28,38,0.35)] ring-0"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 left-8 hidden w-[8.5rem] sm:block lg:-left-4">
            <PhoneScreen
              image={secondary.image}
              alt={projectCopy[secondary.project].images[secondary.image.id]}
              sizes="136px"
              className="shadow-[0_16px_40px_-16px_rgba(23,28,38,0.35)]"
            />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{copy.caption}</p>
      </Reveal>
    </section>
  );
}
