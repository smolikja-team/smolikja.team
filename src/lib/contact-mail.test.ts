import { createTransport } from "nodemailer";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getDictionary } from "@/i18n/dictionaries";
import {
  contactMailConfigFromEnv,
  contactMailOptions,
  contactMailText,
  sendContactMail,
  type ContactMailConfig,
  type ContactMailCopy,
  type ContactMessage,
} from "./contact-mail";

const config: ContactMailConfig = {
  host: "smtp.example.com",
  port: 465,
  user: "hey@smolikja.team",
  password: "secret",
  to: "jakub@smolikja.team",
};
const message: ContactMessage = {
  name: "Jana Nováková",
  email: "jana@example.com",
  message: "Dobrý den, měla bych zájem o aplikaci.",
  source: "landing",
};
const copy: ContactMailCopy = {
  subjects: { landing: "Poptávka – {name}", security: "Poptávka: bezpečnost – {name}" },
  name: "Jméno",
  email: "E-mail",
};

/** Renders the mail as it would go over the wire, without a server. */
async function rawMail(options: ReturnType<typeof contactMailOptions>) {
  const info = await createTransport({ streamTransport: true, buffer: true, newline: "unix" }).sendMail(
    options,
  );
  const [head, ...body] = info.message.toString().split("\n\n");
  return { head, body: body.join("\n\n") };
}

describe("contactMailConfigFromEnv", () => {
  it("requires the SMTP login and defaults the server and the recipient", () => {
    expect(contactMailConfigFromEnv({})).toBeNull();
    expect(contactMailConfigFromEnv({ SMTP_USER: "hey@smolikja.team" })).toBeNull();
    expect(
      contactMailConfigFromEnv({ SMTP_USER: "hey@smolikja.team", SMTP_PASSWORD: "p" }),
    ).toEqual({
      host: "smtp.purelymail.com",
      port: 465,
      user: "hey@smolikja.team",
      password: "p",
      to: "hey@smolikja.team",
    });
  });

  it("takes overrides and treats empty variables as unset", () => {
    expect(
      contactMailConfigFromEnv({
        SMTP_USER: "u",
        SMTP_PASSWORD: "p",
        SMTP_HOST: "smtp.example.com",
        SMTP_PORT: "587",
        CONTACT_TO_EMAIL: "jakub@smolikja.team",
      }),
    ).toMatchObject({ host: "smtp.example.com", port: 587, to: "jakub@smolikja.team" });
    expect(
      contactMailConfigFromEnv({ SMTP_USER: "u", SMTP_PASSWORD: "p", SMTP_PORT: "", CONTACT_TO_EMAIL: "" }),
    ).toMatchObject({ port: 465, to: "hey@smolikja.team" });
    expect(contactMailConfigFromEnv({ SMTP_USER: "u", SMTP_PASSWORD: "p", SMTP_PORT: "abc" })).toBeNull();
  });
});

describe("contactMailOptions", () => {
  it("sends from the mailbox under the visitor's name, with the visitor as Reply-To", () => {
    expect(contactMailOptions(config, message, copy)).toEqual({
      from: { name: "Jana Nováková (web)", address: "hey@smolikja.team" },
      to: "jakub@smolikja.team",
      replyTo: { name: "Jana Nováková", address: "jana@example.com" },
      subject: "Poptávka – Jana Nováková",
      text: "Jméno: Jana Nováková\nE-mail: jana@example.com\n\nDobrý den, měla bych zájem o aplikaci.",
    });
  });

  it("names the page the enquiry came from in the subject", () => {
    expect(contactMailOptions(config, { ...message, source: "security" }, copy).subject).toBe(
      "Poptávka: bezpečnost – Jana Nováková",
    );
  });

  it("writes subject and labels in the visitor's language", async () => {
    const [cs, en] = await Promise.all([getDictionary("cs"), getDictionary("en")]);
    const czech = contactMailOptions(config, message, cs.contact.mail);
    const english = contactMailOptions(config, { ...message, source: "security" }, en.contact.mail);

    expect(czech.subject).toMatch(/^Poptávka z\swebu\s– Jana Nováková$/);
    expect(czech.text).toMatch(/^Jméno: Jana Nováková\nE-mail: jana@example\.com\n\n/);
    expect(english.subject).toBe("Website enquiry: app security – Jana Nováková");
    expect(english.text).toMatch(/^Name: Jana Nováková\nE-mail: jana@example\.com\n\n/);
  });

  it("encodes the headers so a reply goes straight to the visitor", async () => {
    const { head } = await rawMail(contactMailOptions(config, message, copy));
    expect(head).toMatch(/^From: .+ <hey@smolikja\.team>$/m);
    expect(head).toMatch(/^To: jakub@smolikja\.team$/m);
    expect(head).toMatch(/^Reply-To: .+ <jana@example\.com>$/m);
  });

  it("keeps a crafted name from adding headers, faking fields or hiding the sender", async () => {
    const crafted = { ...message, name: "Jana\r\nBcc: victim@example.com‮gnp.exe" };
    const options = contactMailOptions(config, crafted, copy);
    expect(options.from).toEqual({
      name: "Jana Bcc: victim@example.com gnp.exe (web)",
      address: "hey@smolikja.team",
    });

    const { head } = await rawMail(options);
    expect(head).not.toMatch(/^Bcc:/m);
    expect(head).not.toContain("victim@example.com>");
    expect(contactMailText(crafted, copy).split("\n")[0]).toBe("Jméno: Jana Bcc: victim@example.com gnp.exe");
  });
});

describe("sendContactMail", () => {
  it("hands the composed mail to the transport", async () => {
    const sendMail = vi.fn().mockResolvedValue({});

    await expect(sendContactMail(config, message, copy, { sendMail })).resolves.toBe(true);
    expect(sendMail).toHaveBeenCalledWith(contactMailOptions(config, message, copy));
  });

  it("maps a refused or failed delivery to false and logs only the codes", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const refused = Object.assign(new Error("550 jana@example.com rejected"), {
      code: "EENVELOPE",
      responseCode: 550,
    });
    const sendMail = vi.fn().mockRejectedValueOnce(refused).mockRejectedValueOnce(new Error("timeout"));

    await expect(sendContactMail(config, message, copy, { sendMail })).resolves.toBe(false);
    await expect(sendContactMail(config, message, copy, { sendMail })).resolves.toBe(false);
    expect(consoleError.mock.calls).toEqual([
      ["Contact mail delivery failed: EENVELOPE 550"],
      ["Contact mail delivery failed: unknown"],
    ]);
    consoleError.mockRestore();
  });
});
