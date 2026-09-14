import { beforeEach, describe, expect, it } from "vitest";

import { clientIpFromHeaders, isRateLimited, resetRateLimits, type RateLimitWindow } from "./rate-limit";

const windows: RateLimitWindow[] = [
  { name: "minute", limit: 2, windowMs: 60_000 },
  { name: "day", limit: 3, windowMs: 86_400_000 },
];

describe("isRateLimited", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to the limit inside a window and blocks after", () => {
    const now = 1_000_000;
    expect(isRateLimited("s", "1.1.1.1", windows, now)).toBe(false);
    expect(isRateLimited("s", "1.1.1.1", windows, now + 1)).toBe(false);
    expect(isRateLimited("s", "1.1.1.1", windows, now + 2)).toBe(true);
  });

  it("keeps identities and scopes apart", () => {
    const now = 1_000_000;
    isRateLimited("s", "1.1.1.1", windows, now);
    isRateLimited("s", "1.1.1.1", windows, now);
    expect(isRateLimited("s", "2.2.2.2", windows, now)).toBe(false);
    expect(isRateLimited("other", "1.1.1.1", windows, now)).toBe(false);
  });

  it("resets a window once it expires but keeps counting the longer one", () => {
    const now = 1_000_000;
    isRateLimited("s", "1.1.1.1", windows, now);
    isRateLimited("s", "1.1.1.1", windows, now);
    expect(isRateLimited("s", "1.1.1.1", windows, now + 60_001)).toBe(false);
    // Day window: 3 allowed, this is the 4th attempt.
    expect(isRateLimited("s", "1.1.1.1", windows, now + 60_002)).toBe(true);
  });
});

describe("clientIpFromHeaders", () => {
  it("prefers CDN headers, then x-real-ip, then the first forwarded hop", () => {
    expect(clientIpFromHeaders(new Headers({ "cf-connecting-ip": "9.9.9.9", "x-real-ip": "8.8.8.8" }))).toBe("9.9.9.9");
    expect(clientIpFromHeaders(new Headers({ "x-real-ip": "8.8.8.8" }))).toBe("8.8.8.8");
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "1.1.1.1, 10.0.0.1" }))).toBe("1.1.1.1");
    expect(clientIpFromHeaders(new Headers({ forwarded: 'for="[2001:db8::1]:4711";proto=https' }))).toBe("2001:db8::1");
  });

  it("strips ports, rejects junk and falls back to unknown", () => {
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "1.1.1.1:5555" }))).toBe("1.1.1.1");
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "not-an-ip" }))).toBe("unknown");
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });
});
