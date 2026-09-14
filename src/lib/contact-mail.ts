import "server-only";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

/**
 * Delivery of contact-form messages through the Resend HTTP API — a single
 * POST with a bearer token, no SDK. The visitor's address goes to `Reply-To`
 * so answering is one click; the `From` must be on the verified domain.
 * See docs/contact-form.md.
 */

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  locale: Locale;
};

export type ContactMailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FETCH_TIMEOUT_MS = 5000;

export function contactMailConfigFromEnv(
  env: Record<string, string | undefined> = process.env,
): ContactMailConfig | null {
  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_FROM_EMAIL;
  const to = env.CONTACT_TO_EMAIL ?? siteConfig.email;
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

export function contactMailText(message: ContactMessage): string {
  return [
    `Name: ${message.name}`,
    `E-mail: ${message.email}`,
    `Language: ${message.locale}`,
    "",
    message.message,
  ].join("\n");
}

/**
 * Sends the message; resolves `true` on any 2xx. Failures are logged and
 * reported as `false` — the caller maps that to a generic error state.
 */
export async function sendContactMail(
  config: ContactMailConfig,
  message: ContactMessage,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: message.email,
        subject: `${siteConfig.name} – ${message.name}`,
        text: contactMailText(message),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (response.ok) return true;
    console.error(`Contact mail delivery failed: ${response.status}`);
    return false;
  } catch (error) {
    console.error("Contact mail delivery threw:", error);
    return false;
  }
}
