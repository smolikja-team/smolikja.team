import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers({ "x-forwarded-for": "203.0.113.7" })),
}));

const sendContactMail = vi.hoisted(() => vi.fn<() => Promise<boolean>>());
const contactMailConfigFromEnv = vi.hoisted(() => vi.fn<() => object | null>());
vi.mock("@/lib/contact-mail", () => ({ sendContactMail, contactMailConfigFromEnv }));

import { resetRateLimits } from "@/lib/rate-limit";
import { sendContactMessage, type ContactState } from "./contact";

const idle: ContactState = { status: "idle" };

function formData(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  locale: "cs",
  source: "landing",
  name: "Jana Nováková",
  email: "Jana@Example.com",
  message: "Chci aplikaci pro svou kavárnu, aby si lidé mohli objednat dopředu.",
};

describe("sendContactMessage", () => {
  beforeEach(() => {
    resetRateLimits();
    contactMailConfigFromEnv.mockReturnValue({
      host: "smtp.example.com",
      port: 465,
      user: "hey@smolikja.team",
      password: "p",
      to: "jakub@smolikja.team",
    });
    sendContactMail.mockResolvedValue(true);
  });

  it("delivers a valid message with a normalised e-mail", async () => {
    await expect(sendContactMessage(idle, formData(valid))).resolves.toEqual({ status: "success" });
    expect(sendContactMail).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ email: "jana@example.com", source: "landing" }),
      expect.objectContaining({ name: "Jméno" }),
    );
  });

  it("writes the mail in the language of the page it was sent from", async () => {
    await sendContactMessage(idle, formData({ ...valid, locale: "en", source: "security" }));
    expect(sendContactMail).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ source: "security" }),
      expect.objectContaining({ name: "Name" }),
    );
  });

  it("refuses a form without a known locale or source", async () => {
    await expect(sendContactMessage(idle, formData({ ...valid, source: "other" }))).resolves.toMatchObject({
      status: "error",
    });
    await expect(sendContactMessage(idle, formData({ ...valid, locale: "de" }))).resolves.toMatchObject({
      status: "error",
    });
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("reports the invalid fields and hands the entered values back", async () => {
    const state = await sendContactMessage(idle, formData({ ...valid, name: "J", email: "nope" }));

    expect(state).toEqual({
      status: "invalid",
      attempt: 1,
      fields: ["name", "email"],
      values: { name: "J", email: "nope", message: valid.message },
    });
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("counts attempts across failed submissions", async () => {
    const first = await sendContactMessage(idle, formData({ ...valid, message: "short" }));
    const second = await sendContactMessage(first, formData({ ...valid, message: "short" }));
    expect(second).toMatchObject({ status: "invalid", attempt: 2 });
  });

  it("pretends to succeed when the honeypot is filled", async () => {
    await expect(
      sendContactMessage(idle, formData({ ...valid, website: "http://spam" })),
    ).resolves.toEqual({ status: "success" });
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("maps missing configuration and failed delivery to the error state with values", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    contactMailConfigFromEnv.mockReturnValue(null);
    await expect(sendContactMessage(idle, formData(valid))).resolves.toMatchObject({
      status: "error",
      values: { name: valid.name },
    });

    contactMailConfigFromEnv.mockReturnValue({ host: "h", port: 465, user: "u", password: "p", to: "t" });
    sendContactMail.mockResolvedValue(false);
    await expect(sendContactMessage(idle, formData(valid))).resolves.toMatchObject({ status: "error" });
    consoleError.mockRestore();
  });

  it("rate-limits repeated submissions from one address", async () => {
    for (let i = 0; i < 3; i++) await sendContactMessage(idle, formData(valid));
    await expect(sendContactMessage(idle, formData(valid))).resolves.toMatchObject({ status: "error" });
  });

  it("does not count invalid submissions against the limit", async () => {
    for (let i = 0; i < 5; i++) await sendContactMessage(idle, formData({ ...valid, email: "nope" }));
    await expect(sendContactMessage(idle, formData(valid))).resolves.toEqual({ status: "success" });
  });
});
