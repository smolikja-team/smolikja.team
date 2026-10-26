import { ArrowRightIcon, CheckIcon, LayoutDashboardIcon, ServerIcon, SmartphoneIcon } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionary";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/**
 * The product lifecycle: a free introduction, where each kind of visitor
 * joins, then four stages with what the customer takes away from each, and
 * what a delivery usually includes besides the app. Stages are a real
 * sequence and the entry points refer to them by number, so numbering is
 * information here, not decoration.
 */
export function ProcessSection({ copy }: { copy: Dictionary["process"] }) {
  return (
    <Section id="process" tone="tinted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.intro} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.free.title}</h3>
          <p className="leading-relaxed text-pretty">{copy.free.text}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{copy.entriesTitle}</h3>
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.entries.map((entry) => (
              <li
                key={entry.situation}
                className="flex flex-col gap-2 rounded-2xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <p className="font-medium text-balance">{entry.situation}</p>
                <p className="mt-auto flex gap-2 text-sm text-primary">
                  <ArrowRightIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  {entry.start}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ol className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {copy.stages.map((stage, index) => (
            <li key={stage.title} className="flex flex-col gap-4 border-t pt-6">
              <p className="text-sm font-medium text-muted-foreground">{index + 1}</p>
              <h3 className="text-xl font-semibold tracking-tight text-balance">{stage.title}</h3>
              <p className="leading-relaxed text-pretty">{stage.text}</p>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <p className="text-sm font-medium">{copy.outputsLabel}</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {stage.outputs.map((output) => (
                    <li key={output} className="flex gap-2">
                      <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* What a delivery usually includes: the app plus the two parts it often needs. */}
        <div className="flex flex-col gap-4 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
          <div aria-hidden="true" className="flex shrink-0 gap-3 text-primary">
            <SmartphoneIcon className="size-6" />
            <LayoutDashboardIcon className="size-6" />
            <ServerIcon className="size-6" />
          </div>
          <p className="leading-relaxed text-pretty">{copy.scope}</p>
        </div>

        <p className="max-w-prose leading-relaxed text-pretty text-muted-foreground">{copy.handover}</p>
      </div>
    </Section>
  );
}
