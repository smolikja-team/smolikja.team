import Image from "next/image";
import { CalendarClockIcon, FileTextIcon, KeyRoundIcon } from "lucide-react";

import { ownerPhotos } from "@/config/assets";
import type { Dictionary } from "@/i18n/dictionary";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/** Icons for the assurances, in catalog order: ownership, handover, planning. */
const assuranceIcons = [KeyRoundIcon, FileTextIcon, CalendarClockIcon] as const;

/**
 * Who the customer works with: the owner's portrait and story, the way of
 * working with AI agents, and the concrete practices that answer the worry
 * about depending on one person.
 */
export function AboutSection({ copy }: { copy: Dictionary["about"] }) {
  const { portrait, workspace } = ownerPhotos;

  return (
    <Section id="about">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <Image
            src={portrait.src}
            alt={copy.portraitAlt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 640px) 384px, calc(100vw - 2.5rem)"
            className="aspect-square w-full max-w-sm rounded-3xl object-cover lg:order-last lg:justify-self-end"
          />
          <div className="flex flex-col gap-6">
            <SectionHeading title={copy.title} />
            {copy.bio.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-lg leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <Image
            src={workspace.src}
            alt={copy.ai.workspaceAlt}
            width={workspace.width}
            height={workspace.height}
            sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, calc(100vw - 2.5rem)"
            className="h-auto w-full rounded-3xl"
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{copy.ai.title}</h3>
            {copy.ai.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{copy.assurances.title}</h3>
          <ul className="grid grid-cols-[minmax(0,1fr)] divide-y rounded-3xl bg-secondary md:grid-cols-3 md:divide-x md:divide-y-0">
            {copy.assurances.items.map((item, index) => {
              const Icon = assuranceIcons[index % assuranceIcons.length];
              return (
                <li key={item.title} className="flex flex-col gap-3 p-6 sm:p-8">
                  <Icon aria-hidden="true" className="size-6 text-primary" />
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="leading-relaxed text-pretty text-muted-foreground">{item.text}</p>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-muted-foreground">{copy.assurances.note}</p>
        </div>
      </div>
    </Section>
  );
}
