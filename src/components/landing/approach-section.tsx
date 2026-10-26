import type { Dictionary } from "@/i18n/dictionary";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/**
 * How a collaboration runs — deliberately not a fixed sequence of stages:
 * the free introduction as the entry point, then three working principles.
 */
export function ApproachSection({ copy }: { copy: Dictionary["approach"] }) {
  return (
    <Section id="approach" tone="tinted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.intro} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.free.title}</h3>
          <p className="leading-relaxed text-pretty">{copy.free.text}</p>
        </div>

        <ul className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
          {copy.principles.map((principle) => (
            <li key={principle.title} className="flex flex-col gap-3 border-t pt-6">
              <h3 className="text-xl font-semibold tracking-tight text-balance">{principle.title}</h3>
              <p className="leading-relaxed text-pretty text-muted-foreground">{principle.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
