import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { serviceOrder } from "@/config/pages";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/**
 * The offer as four verbs of one story — work it out, build, secure, grow —
 * so security reads as part of the same work rather than a separate camp.
 * The "secure" card is filled with the brand colour and carries a prominent
 * link to the full app-security page — the owner's chosen emphasis.
 */
export function ServicesSection({
  copy,
  securityHref,
}: {
  copy: Dictionary["services"];
  securityHref: string;
}) {
  return (
    <Section id="services" tone="tinted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-20 sm:px-6 sm:py-24">
        <SectionHeading title={copy.title} text={copy.intro} />
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceOrder.map((id) => {
            const item = copy.items[id];
            const highlighted = id === "secure";
            return (
              <li
                key={id}
                className={cn(
                  "flex flex-col gap-4 rounded-3xl p-6 sm:p-7",
                  highlighted
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/25"
                    : "bg-card ring-1 ring-foreground/10",
                )}
              >
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="leading-relaxed text-pretty">{item.text}</p>
                <ul
                  className={cn(
                    "flex flex-col gap-2 text-sm",
                    highlighted ? "text-primary-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <CheckIcon
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          highlighted ? "text-primary-foreground" : "text-primary",
                        )}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                {highlighted ? (
                  <a
                    href={securityHref}
                    className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-card px-4 py-2 font-semibold text-primary shadow-sm transition-colors outline-none hover:bg-secondary focus-visible:ring-3 focus-visible:ring-primary-foreground/70"
                  >
                    {copy.securityLink}
                    <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" />
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
