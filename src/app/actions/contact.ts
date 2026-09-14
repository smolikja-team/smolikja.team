"use server";

import "server-only";

import { headers } from "next/headers";
import { z } from "zod";

import { isLocale } from "@/i18n/config";
import { contactMailConfigFromEnv, sendContactMail } from "@/lib/contact-mail";
import { clientIpFromHeaders, isRateLimited, type RateLimitWindow } from "@/lib/rate-limit";

export type ContactState = {
  status: "idle" | "success" | "invalid" | "error";
};

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
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: humans never see the "website" field, bots fill everything.
  // Pretend success so scripts don't retry with the field left empty.
  if (formData.get("website")) return { status: "success" };

  const requestHeaders = await headers();
  if (isRateLimited("contact-ip", clientIpFromHeaders(requestHeaders), IP_RATE_LIMITS)) {
    return { status: "error" };
  }

  const locale = getString(formData, "locale");
  if (!isLocale(locale)) return { status: "error" };

  const parsed = contactSchema.safeParse({
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    message: getString(formData, "message"),
  });
  if (!parsed.success) return { status: "invalid" };

  const config = contactMailConfigFromEnv();
  if (!config) {
    console.error("RESEND_API_KEY / CONTACT_FROM_EMAIL are not set — cannot send contact mail.");
    return { status: "error" };
  }

  const delivered = await sendContactMail(config, { ...parsed.data, locale });
  return { status: delivered ? "success" : "error" };
}
