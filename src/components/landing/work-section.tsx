import { experiences, workGallery } from "@/config/work";
import type { Dictionary } from "@/i18n/dictionary";
import { ScrollGallery } from "./scroll-gallery";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/**
 * Experience by kind of project rather than a portfolio of named cases: real
 * screens in iPhone mockups on a scroll-driven strip, then short cards naming
 * the industry, what was built and the technologies — never the client or
 * the product.
 */
export function WorkSection({ copy }: { copy: Dictionary["work"] }) {
  return (
    <Section id="work" tone="tinted" className="overflow-x-clip">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.intro} />

        <ScrollGallery images={workGallery} copy={copy.images} label={copy.galleryLabel} />

        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ id, tags }) => {
            const item = copy.experiences[id];
            return (
              <li
                key={id}
                className="flex flex-col gap-3 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-7"
              >
                <p className="text-sm font-medium text-primary">{item.sector}</p>
                <h3 className="text-xl font-semibold tracking-tight text-balance">{item.title}</h3>
                <p className="leading-relaxed text-pretty text-muted-foreground">{item.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
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
