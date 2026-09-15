"use server";

import "server-only";

import { headers } from "next/headers";
import { z } from "zod";

import { isLocale } from "@/i18n/config";
import { contactMailConfigFromEnv, sendContactMail } from "@/lib/contact-mail";
import { clientIpFromHeaders, isRateLimited, type RateLimitWindow } from "@/lib/rate-limit";

export type ContactField = "name" | "email" | "message";

export type ContactValues = Record<ContactField, string>;

/**
 * Discriminated form state. Failed submissions carry the entered values back
 * so the form can re-fill itself (React resets an uncontrolled form after its
 * action runs) and, for validation failures, the fields to highlight. Error
 * copy stays in the dictionaries — the state carries field names, not text.
 * `attempt` counts failed submissions so the form can remount its fields with
 * the restored values instead of mutating an uncontrolled default.
 */
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; attempt: number; values: ContactValues; fields: ContactField[] }
  | { status: "error"; attempt: number; values: ContactValues };

function nextAttempt(prevState: ContactState): number {
  return "attempt" in prevState ? prevState.attempt + 1 : 1;
}

// Generous for humans, tight for scripts: a person rarely sends more than a
// couple of messages, a bot retries in bursts.
const IP_RATE_LIMITS: RateLimitWindow[] = [
  { name: "minute", limit: 3, windowMs: 60_000 },
  { name: "day", limit: 20, windowMs: 86_400_000 },
];

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase(),
  message: z.string().trim().min(10).max(4000),
});

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const attempt = nextAttempt(prevState);
  // Honeypot: humans never see the "website" field, bots fill everything.
  // Pretend success so scripts don't retry with the field left empty.
  if (formData.get("website")) return { status: "success" };

  const values: ContactValues = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    message: getString(formData, "message"),
  };

  const requestHeaders = await headers();
  if (isRateLimited("contact-ip", clientIpFromHeaders(requestHeaders), IP_RATE_LIMITS)) {
    return { status: "error", attempt, values };
  }

  const locale = getString(formData, "locale");
  if (!isLocale(locale)) return { status: "error", attempt, values };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];
    return {
      status: "invalid",
      attempt,
      values,
      fields: fields.filter((field): field is ContactField =>
        field === "name" || field === "email" || field === "message",
      ),
    };
  }

  const config = contactMailConfigFromEnv();
  if (!config) {
    console.error("RESEND_API_KEY / CONTACT_FROM_EMAIL are not set — cannot send contact mail.");
    return { status: "error", attempt, values };
  }

  const delivered = await sendContactMail(config, { ...parsed.data, locale });
  return delivered ? { status: "success" } : { status: "error", attempt, values };
}
