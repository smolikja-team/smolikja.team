import { workGallery } from "@/config/work";
import type { Dictionary } from "@/i18n/dictionary";
import { ScrollGallery } from "./scroll-gallery";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/**
 * "My work": the heading and real screens in iPhone mockups pinned together
 * on a scroll-driven strip. The kinds of projects behind them follow in their
 * own section (`ExperienceSection`).
 */
export function WorkSection({ copy }: { copy: Dictionary["work"] }) {
  return (
    <Section id="work" className="overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <ScrollGallery
          heading={<SectionHeading title={copy.title} text={copy.intro} />}
          images={workGallery}
          copy={copy.images}
          label={copy.galleryLabel}
        />
      </div>
    </Section>
  );
}
