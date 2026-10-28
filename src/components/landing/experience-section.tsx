import {
  BrainCircuitIcon,
  HouseWifiIcon,
  LandmarkIcon,
  MapPinnedIcon,
  RocketIcon,
  WheatIcon,
  type LucideIcon,
} from "lucide-react";

import { experiences, type ExperienceId } from "@/config/work";
import type { Dictionary } from "@/i18n/dictionary";
import { MarkedText } from "./marked-text";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/** One icon per kind of project, beside its sector label. */
const experienceIcons: Record<ExperienceId, LucideIcon> = {
  "smart-buildings": HouseWifiIcon,
  agriculture: WheatIcon,
  startup: RocketIcon,
  "public-app": MapPinnedIcon,
  regulated: LandmarkIcon,
  "web-ai": BrainCircuitIcon,
};

/**
 * Experience by kind of project rather than a portfolio of named cases —
 * never the client or the product. Short cards; the key phrase of each text
 * is set heavier and underlined as the reader scrolls, so the eye has
 * something to land on in every card.
 */
export function ExperienceSection({ copy }: { copy: Dictionary["work"] }) {
  return (
    <Section id="experience" tone="tinted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-20 sm:px-6 sm:py-24">
        <SectionHeading title={copy.experiencesTitle} text={copy.experiencesText} />
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ id, tags }) => {
            const item = copy.experiences[id];
            const Icon = experienceIcons[id];
            return (
              <li
                key={id}
                className="flex flex-col gap-3 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-7"
              >
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {item.sector}
                </p>
                <h3 className="text-xl font-semibold text-balance">{item.title}</h3>
                <p className="leading-relaxed text-pretty text-muted-foreground">
                  <MarkedText text={item.text} />
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2 font-mono text-xs">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
