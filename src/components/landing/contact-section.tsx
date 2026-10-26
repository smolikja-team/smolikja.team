import { MailIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { ContactForm } from "./contact-form";
import { FreeConsultationNote } from "./free-consultation-note";
import { OwnerBadge } from "./owner-badge";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

export function ContactSection({
  copy,
  locale,
  privacyHref,
}: {
  copy: Dictionary["contact"];
  locale: Locale;
  privacyHref: string;
}) {
  return (
    <Section id="contact" tone="tinted">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading title={copy.title} text={copy.text} />
          <OwnerBadge detail={copy.personal} />
          <FreeConsultationNote lead={copy.freeConsultation} detail={copy.freeConsultationDetail} />
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <span>{copy.direct.label}</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-foreground underline decoration-foreground/30 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <MailIcon aria-hidden="true" className="size-4" />
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div className="rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
          <ContactForm copy={copy.form} locale={locale} privacyHref={privacyHref} />
        </div>
      </div>
    </Section>
  );
}
