import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/i18n/dictionary";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

/** The questions that would otherwise stop a visitor from getting in touch. */
export function FaqSection({ copy }: { copy: Dictionary["faq"] }) {
  return (
    <Section>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading title={copy.title} />
        <Accordion>
          {copy.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="min-h-12 py-3 text-base sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-pretty text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
