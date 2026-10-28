import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { contactMailConfigFromEnv, contactMailText, sendContactMail } from "./contact-mail";

const config = { apiKey: "re_test", from: "web@smolikja.team", to: "team@example.com" };
const message = {
  name: "Jana Nováková",
  email: "jana@example.com",
  message: "Dobrý den, měla bych zájem o aplikaci.",
  locale: "cs" as const,
};

describe("contactMailConfigFromEnv", () => {
  it("requires the API key and sender, defaults the recipient", () => {
    expect(contactMailConfigFromEnv({})).toBeNull();
    expect(contactMailConfigFromEnv({ RESEND_API_KEY: "k" })).toBeNull();
    expect(
      contactMailConfigFromEnv({ RESEND_API_KEY: "k", CONTACT_FROM_EMAIL: "web@smolikja.team" }),
    ).toEqual({ apiKey: "k", from: "web@smolikja.team", to: "hey@smolikja.team" });
    expect(
      contactMailConfigFromEnv({
        RESEND_API_KEY: "k",
        CONTACT_FROM_EMAIL: "web@smolikja.team",
        CONTACT_TO_EMAIL: "x@y.z",
      })?.to,
    ).toBe("x@y.z");
  });
});

describe("sendContactMail", () => {
  it("posts the message to Resend with the visitor as Reply-To", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));

    await expect(sendContactMail(config, message, fetchMock)).resolves.toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer re_test");
    const body = JSON.parse(String(init?.body));
    expect(body).toMatchObject({
      from: config.from,
      to: [config.to],
      reply_to: message.email,
      text: contactMailText(message),
    });
    expect(body.subject).toContain(message.name);
  });

  it("maps non-2xx responses and thrown errors to false", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const failing = vi.fn<typeof fetch>().mockResolvedValue(new Response("nope", { status: 500 }));
    const throwing = vi.fn<typeof fetch>().mockRejectedValue(new Error("timeout"));

    await expect(sendContactMail(config, message, failing)).resolves.toBe(false);
    await expect(sendContactMail(config, message, throwing)).resolves.toBe(false);
    expect(consoleError).toHaveBeenCalledTimes(2);
    consoleError.mockRestore();
  });
});
