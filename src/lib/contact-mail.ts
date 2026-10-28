import "server-only";

import { createTransport, type SendMailOptions } from "nodemailer";

import type { ContactSource } from "@/config/contact";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";

/**
 * Delivery of contact-form messages over SMTP through the owner's own
 * mailbox. The mail is sent from the authenticated address with the
 * visitor's name as the display name, to a different inbox, and the visitor's
 * address goes to `Reply-To` so answering is one click. Sender and recipient
 * must differ: some mail clients ignore `Reply-To` on mail from one's own
 * address. Subject and labels are in the visitor's language, since they see
 * the mail again under the reply. See docs/contact-form.md.
 */

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  /** The page the form was sent from; it picks the subject. */
  source: ContactSource;
};

/** The mail's wording in the visitor's language. */
export type ContactMailCopy = Dictionary["contact"]["mail"];

export type ContactMailConfig = {
  host: string;
  port: number;
  /** The mailbox that sends — also the `From` address. */
  user: string;
  password: string;
  to: string;
};

/** The part of a nodemailer transport this module uses; tests pass a stub. */
export type MailTransport = {
  sendMail(options: SendMailOptions): Promise<unknown>;
};

const DEFAULT_SMTP_HOST = "smtp.purelymail.com";
const DEFAULT_SMTP_PORT = 465;
// Applies to connecting, the server greeting and each later wait, so a
// stalled mail server cannot hold the form for long.
const SMTP_TIMEOUT_MS = 5000;

export function contactMailConfigFromEnv(
  env: Record<string, string | undefined> = process.env,
): ContactMailConfig | null {
  const user = env.SMTP_USER;
  const password = env.SMTP_PASSWORD;
  // `||`, not `??`: an empty variable in the hosting panel counts as unset.
  const host = env.SMTP_HOST || DEFAULT_SMTP_HOST;
  const port = Number(env.SMTP_PORT || DEFAULT_SMTP_PORT);
  const to = env.CONTACT_TO_EMAIL || siteConfig.email;
  if (!user || !password || !Number.isInteger(port)) return null;
  return { host, port, user, password, to };
}

/**
 * Removes line breaks and other control or invisible formatting characters
 * (such as right-to-left overrides), so a visitor's name can neither add a
 * header line, fake a field in the body nor disguise the sender.
 */
function singleLine(value: string): string {
  return value
    .replace(/[\p{Cc}\p{Cf}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function contactMailText(message: ContactMessage, copy: ContactMailCopy): string {
  return [
    `${copy.name}: ${singleLine(message.name)}`,
    `${copy.email}: ${message.email}`,
    "",
    message.message,
  ].join("\n");
}

export function contactMailOptions(
  config: ContactMailConfig,
  message: ContactMessage,
  copy: ContactMailCopy,
): SendMailOptions {
  const name = singleLine(message.name) || message.email;
  return {
    from: { name: `${name} (web)`, address: config.user },
    to: config.to,
    replyTo: { name, address: message.email },
    subject: format(copy.subjects[message.source], { name }),
    text: contactMailText(message, copy),
  };
}

function smtpTransport(config: ContactMailConfig): MailTransport {
  const implicitTls = config.port === 465;
  return createTransport({
    host: config.host,
    port: config.port,
    secure: implicitTls,
    // Any other port must upgrade with STARTTLS; never send in plain text.
    requireTLS: !implicitTls,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
}

/**
 * Sends the message; resolves `true` once the mail server accepts it.
 * Failures are logged and reported as `false` — the caller maps that to a
 * generic error state.
 */
export async function sendContactMail(
  config: ContactMailConfig,
  message: ContactMessage,
  copy: ContactMailCopy,
  transport: MailTransport = smtpTransport(config),
): Promise<boolean> {
  try {
    await transport.sendMail(contactMailOptions(config, message, copy));
    return true;
  } catch (error) {
    // Codes only: the server's reply can quote the visitor's address.
    const { code, responseCode } = (error ?? {}) as { code?: unknown; responseCode?: unknown };
    console.error(`Contact mail delivery failed: ${String(code ?? "unknown")} ${String(responseCode ?? "")}`.trim());
    return false;
  }
}
