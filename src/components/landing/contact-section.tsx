import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { ContactChannels } from "./contact-channels";
import { ContactForm } from "./contact-form";

export function ContactSection({
  copy,
  locale,
}: {
  copy: Dictionary["contact"];
  locale: Locale;
}) {
  return (
    <section id="contact" className="scroll-mt-14 border-t">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.title}</h2>
            <p className="max-w-prose text-lg leading-relaxed text-pretty text-muted-foreground">
              {copy.text}
            </p>
          </div>
          <ContactForm copy={copy.form} locale={locale} />
        </div>
        <ContactChannels copy={copy.channels} />
      </div>
    </section>
  );
}
