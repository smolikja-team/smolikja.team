"use client";

import { useActionState } from "react";
import { CheckIcon } from "lucide-react";

import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  copy,
  locale,
}: {
  copy: Dictionary["contact"]["form"];
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "success") {
    return (
      <p
        aria-live="polite"
        className="flex items-start gap-3 rounded-xl bg-secondary px-4 py-3 text-secondary-foreground"
      >
        <CheckIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        {copy.success}
      </p>
    );
  }

  const invalid = state.status === "invalid";

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — off-screen for humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={invalid || undefined}>
            <FieldLabel htmlFor="contact-name">{copy.name}</FieldLabel>
            <Input
              id="contact-name"
              name="name"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              aria-invalid={invalid || undefined}
            />
          </Field>
          <Field data-invalid={invalid || undefined}>
            <FieldLabel htmlFor="contact-email">{copy.email}</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={invalid || undefined}
            />
          </Field>
        </div>
        <Field data-invalid={invalid || undefined}>
          <FieldLabel htmlFor="contact-message">{copy.message}</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={6}
            placeholder={copy.messagePlaceholder}
            aria-invalid={invalid || undefined}
          />
        </Field>
      </FieldGroup>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Spinner data-icon="inline-start" /> : null}
          {pending ? copy.submitting : copy.submit}
        </Button>
        <p className="text-sm text-muted-foreground">{copy.privacyNote}</p>
      </div>

      <p aria-live="polite" role="status" className="min-h-5 text-sm text-destructive">
        {state.status === "invalid"
          ? copy.errorInvalid
          : state.status === "error"
            ? copy.errorServer
            : null}
      </p>
    </form>
  );
}
