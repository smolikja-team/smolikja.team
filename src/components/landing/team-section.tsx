import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "./section-heading";

/** Who delivers and how the collaboration works — brief, in the agency's voice. */
export function TeamSection({ copy }: { copy: Dictionary["team"] }) {
  return (
    <section id="about" className="scroll-mt-16 border-t">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading title={copy.title} />
        <div className="flex flex-col gap-5">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-lg leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
