import { CheckIcon } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "./section-heading";

/**
 * The working process: a free introduction as the entry point, then three
 * delivery stages with what the customer takes away from each. Stages are
 * a real sequence, so numbering is information here, not decoration.
 */
export function ProcessSection({ copy }: { copy: Dictionary["process"] }) {
  return (
    <section id="process" className="scroll-mt-16 border-t bg-secondary/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.intro} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.free.title}</h3>
          <p className="leading-relaxed text-pretty">{copy.free.text}</p>
        </div>

        <ol className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
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

        <p className="max-w-prose leading-relaxed text-pretty text-muted-foreground">{copy.handover}</p>
      </div>
    </section>
  );
}
