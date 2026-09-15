# Contact form

The landing page's contact form invokes the Server Action in
`src/app/actions/contact.ts`. The action validates browser input, applies
abuse protection and delivers the message by e-mail through the Resend HTTP
API. The browser never calls Resend and never sees the API key.

## Flow

1. `contact-form.tsx` (client) submits `name`, `email`, `message`, a hidden
   `locale` and the honeypot field `website` through `useActionState`.
2. The action returns a discriminated state — `idle`, `success`, `invalid`
   (with the invalid field names) or `error` — and never throws to the client.
   Both failure states carry the entered values back, because React resets an
   uncontrolled form after its action runs; the form keys its fields on the
   `attempt` counter so they remount with the restored text. `invalid`
   highlights the fields and shows per-field messages, `error` shows a retry
   message with the direct e-mail as the fallback channel. Success confirms
   the enquiry and the promised reply — not an appointment.
3. `src/lib/contact-mail.ts` POSTs to `https://api.resend.com/emails` with a
   five-second timeout. Any `2xx` is success.

The privacy page (`/{locale}/privacy`) linked from the form describes exactly
this processing; keep the two in sync when the flow changes.

## Delivery contract

```http
POST https://api.resend.com/emails
Authorization: Bearer {RESEND_API_KEY}
Content-Type: application/json
```

```json
{
  "from": "{CONTACT_FROM_EMAIL}",
  "to": ["{CONTACT_TO_EMAIL or siteConfig.email}"],
  "reply_to": "visitor@example.com",
  "subject": "smolikja team – Visitor Name",
  "text": "Name: …\nE-mail: …\nLanguage: cs\n\n<message>"
}
```

`reply_to` is the visitor's address, so answering from the inbox is one click.
`from` must belong to a domain verified in Resend (DNS records for
`smolikja.team`); Resend rejects unverified senders with a `4xx`, which the
form reports as the generic error state.

## Environment

| Variable | Requirement | Behaviour when missing |
| --- | --- | --- |
| `RESEND_API_KEY` | Required | Every submission returns `error`; nothing is sent. |
| `CONTACT_FROM_EMAIL` | Required | Same as above. |
| `CONTACT_TO_EMAIL` | Optional | Defaults to `siteConfig.email` in `src/config/site.ts`. |

Local development uses `.env.local`; production values live in Coolify.
Misconfiguration is logged on the server with `console.error`.

## Protection enforced by this web

- Honeypot: a non-empty `website` field receives neutral success without
  delivery, so scripts do not retry with the field left empty.
- Zod validation: name 2–120 characters, valid e-mail (lower-cased), message
  10–4000 characters. HTML form constraints mirror these for early feedback.
- Hashed-IP, process-local fixed windows of 3 attempts per minute and 20 per
  day (`src/lib/rate-limit.ts`). The IP comes from `cf-connecting-ip`,
  `x-real-ip`, the first `x-forwarded-for` hop or the `Forwarded` header, in
  that order; unknown clients share one bucket.
- A 32 KB Server Action body limit configured in `next.config.ts`.
- A five-second upstream timeout and `no-store` fetch policy.

## Limitations

- Rate limiting is process-local: it resets on restart and is not shared
  between replicas. Add a shared store before running more than one instance.
- Forwarded IP headers are only meaningful when the proxy chain (Coolify's
  Traefik) is trusted to set them.
- There is no CAPTCHA and no server-side spam scoring; Resend's own abuse
  controls and the mailbox's filters are the next line of defence.
