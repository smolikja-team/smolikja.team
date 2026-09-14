import { createHash } from "node:crypto";
import { isIP } from "node:net";

/**
 * Process-local fixed-window rate limiting keyed by a hashed client IP.
 * Buckets live in module memory, so limits reset on restart and are not
 * shared between replicas — documented in docs/contact-form.md. Good enough
 * as the first line of defence for a single-replica contact form; move to a
 * shared store before running more than one instance.
 */

export type RateLimitWindow = {
  name: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const CLEANUP_INTERVAL_MS = 60_000;

const buckets = new Map<string, RateLimitBucket>();
let lastCleanupAt = 0;

function stripQuotes(value: string): string {
  return value.replace(/^"|"$/g, "");
}

function normalizeIp(value: string | null | undefined): string | null {
  if (!value) return null;

  const candidate = stripQuotes(value.trim());
  if (isIP(candidate)) return candidate;

  const bracketedIpv6 = candidate.match(/^\[([^\]]+)](?::\d+)?$/);
  if (bracketedIpv6 && isIP(bracketedIpv6[1])) return bracketedIpv6[1];

  const ipv4WithPort = candidate.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?$/);
  if (ipv4WithPort && isIP(ipv4WithPort[1])) return ipv4WithPort[1];

  return null;
}

function forwardedHeaderIp(value: string | null): string | null {
  if (!value) return null;

  const firstEntry = value.split(",")[0];
  const forPart = firstEntry
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith("for="));

  return normalizeIp(forPart?.slice(4));
}

/**
 * Best-effort client IP from proxy headers (Coolify's Traefik sets
 * `x-forwarded-for`). The proxy chain must be trusted for this to be a
 * meaningful security key; falls back to "unknown", which then shares a bucket.
 */
export function clientIpFromHeaders(requestHeaders: Headers): string {
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0];

  return (
    normalizeIp(requestHeaders.get("cf-connecting-ip")) ??
    normalizeIp(requestHeaders.get("x-real-ip")) ??
    normalizeIp(forwardedFor) ??
    forwardedHeaderIp(requestHeaders.get("forwarded")) ??
    "unknown"
  );
}

function hashedKey(scope: string, value: string): string {
  const digest = createHash("sha256").update(value).digest("hex");
  return `${scope}:${digest}`;
}

function cleanup(now: number): void {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function consume(key: string, window: RateLimitWindow, now: number): boolean {
  const bucketKey = `${key}:${window.name}`;
  const bucket = buckets.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + window.windowMs });
    return true;
  }

  if (bucket.count >= window.limit) return false;
  bucket.count += 1;
  return true;
}

/**
 * Returns `true` when the caller identified by `scope` + `identity` has
 * exhausted any of the given windows. Every call counts as an attempt.
 */
export function isRateLimited(
  scope: string,
  identity: string,
  windows: readonly RateLimitWindow[],
  now = Date.now(),
): boolean {
  cleanup(now);
  const key = hashedKey(scope, identity);
  return windows.some((window) => !consume(key, window, now));
}

/** Test hook: drops every bucket. */
export function resetRateLimits(): void {
  buckets.clear();
  lastCleanupAt = 0;
}
