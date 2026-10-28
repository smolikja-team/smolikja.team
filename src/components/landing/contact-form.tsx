"use client";

import { useActionState } from "react";
import { CheckIcon } from "lucide-react";

import {
  sendContactMessage,
  type ContactField,
  type ContactState,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { ContactSource } from "@/config/contact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  copy,
  locale,
  source,
  privacyHref,
}: {
  copy: Dictionary["contact"]["form"];
  locale: Locale;
  /** The page the form sits on; it picks the enquiry's subject. */
  source: ContactSource;
  privacyHref: string;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div
        aria-live="polite"
        role="status"
        className="flex items-start gap-3 rounded-2xl bg-secondary p-5 text-secondary-foreground"
      >
        <CheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{copy.successTitle}</p>
          <p className="text-pretty text-muted-foreground">{copy.success}</p>
        </div>
      </div>
    );
  }

  // Failed submissions come back with the entered text so nothing is lost; the
  // attempt counter keys the fields so they remount with the restored values.
  const failed = state.status === "invalid" || state.status === "error" ? state : null;
  const values = failed?.values;
  const invalidFields = state.status === "invalid" ? state.fields : [];
  const isInvalid = (field: ContactField) => invalidFields.includes(field);

  // Inputs are 16 px so iOS does not zoom on focus and the form matches body copy.
  const controlClassName = "h-12 rounded-xl bg-card text-base md:text-base";

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      {/* Honeypot — off-screen for humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <FieldGroup key={failed?.attempt ?? 0}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
          <Field data-invalid={isInvalid("name") || undefined}>
            <FieldLabel htmlFor="contact-name" className="text-base">
              {copy.name}
            </FieldLabel>
            <Input
              id="contact-name"
              name="name"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              defaultValue={values?.name}
              aria-invalid={isInvalid("name") || undefined}
              aria-describedby={isInvalid("name") ? "contact-name-error" : undefined}
              className={controlClassName}
            />
            {isInvalid("name") ? (
              <FieldError id="contact-name-error">{copy.errors.name}</FieldError>
            ) : null}
          </Field>
          <Field data-invalid={isInvalid("email") || undefined}>
            <FieldLabel htmlFor="contact-email" className="text-base">
              {copy.email}
            </FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={values?.email}
              aria-invalid={isInvalid("email") || undefined}
              aria-describedby={isInvalid("email") ? "contact-email-error" : undefined}
              className={controlClassName}
            />
            {isInvalid("email") ? (
              <FieldError id="contact-email-error">{copy.errors.email}</FieldError>
            ) : null}
          </Field>
        </div>
        <Field data-invalid={isInvalid("message") || undefined}>
          <FieldLabel htmlFor="contact-message" className="text-base">
            {copy.message}
          </FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={6}
            defaultValue={values?.message}
            aria-invalid={isInvalid("message") || undefined}
            aria-describedby={
              isInvalid("message") ? "contact-message-error contact-message-hint" : "contact-message-hint"
            }
            className="min-h-40 rounded-xl bg-card text-base md:text-base"
          />
          <FieldDescription id="contact-message-hint">{copy.messageHint}</FieldDescription>
          {isInvalid("message") ? (
            <FieldError id="contact-message-error">{copy.errors.message}</FieldError>
          ) : null}
        </Field>
      </FieldGroup>

      <div aria-live="polite" role="status" className="text-sm text-destructive empty:hidden">
        {state.status === "invalid"
          ? copy.errorSummary
          : state.status === "error"
            ? copy.errors.server
            : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button type="submit" size="lg" disabled={pending} className="h-12 rounded-xl px-6 text-base">
          {pending ? <Spinner data-icon="inline-start" /> : null}
          {pending ? copy.submitting : copy.submit}
        </Button>
        <p className="text-sm text-muted-foreground">
          {copy.privacyNote}{" "}
          <a
            href={privacyHref}
            className="rounded-sm underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {copy.privacyLink}
          </a>
        </p>
      </div>
    </form>
  );
}
