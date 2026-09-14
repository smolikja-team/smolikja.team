import type { Dictionary } from "@/i18n/dictionary";
import { Reveal } from "./reveal";

/** The one sentence that says what the team does — the page's only reveal. */
export function StatementSection({ copy }: { copy: Dictionary["statement"] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {copy.title}
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {copy.text}
        </p>
      </Reveal>
    </section>
  );
}
