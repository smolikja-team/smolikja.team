import { BotIcon, DatabaseIcon, KeyRoundIcon, ServerIcon } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionary";
import { CtaLink } from "./cta-link";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/** Icons for the checks, in catalog order: data, keys, server, AI. */
const checkIcons = [DatabaseIcon, KeyRoundIcon, ServerIcon, BotIcon] as const;

/**
 * The security teaser on the landing page: why it matters now, the four
 * things a review looks at, an honest note on what it is not, and the way to
 * the full app-security page.
 */
export function SecuritySection({
  copy,
  securityHref,
}: {
  copy: Dictionary["security"];
  securityHref: string;
}) {
  return (
    <Section id="security">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading title={copy.title} text={copy.text} />
          <p className="text-sm text-muted-foreground">{copy.note}</p>
          <CtaLink href={securityHref} variant="outline" className="w-fit">
            {copy.link}
          </CtaLink>
        </div>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
          {copy.checks.map((check, index) => {
            const Icon = checkIcons[index % checkIcons.length];
            return (
              <li key={check.title} className="flex flex-col gap-3 rounded-3xl bg-secondary p-6 sm:p-7">
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <h3 className="text-lg font-semibold">{check.title}</h3>
                <p className="leading-relaxed text-pretty text-muted-foreground">{check.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
