# Contact form

The landing page's contact form invokes the Server Action in
`src/app/actions/contact.ts`. The action validates browser input, applies
abuse protection and delivers the message by e-mail over SMTP through the
owner's own mailbox (Purelymail, the provider that hosts mail for
`smolikja.team`). The browser never talks to the mail server and never sees
the credentials.

## Flow

1. `contact-form.tsx` (client) submits `name`, `email`, `message`, the
   hidden `locale` and `source` (the page the form sits on: `landing` or
   `security`, from `src/config/contact.ts`) and the honeypot field `website`
   through `useActionState`.
2. The action returns a discriminated state — `idle`, `success`, `invalid`
   (with the invalid field names) or `error` — and never throws to the client.
   Both failure states carry the entered values back, because React resets an
   uncontrolled form after its action runs; the form keys its fields on the
   `attempt` counter so they remount with the restored text. `invalid`
   highlights the fields and shows per-field messages, `error` shows a retry
   message with the direct e-mail as the fallback channel. Success confirms
   the enquiry and the promised reply — not an appointment.
3. `src/lib/contact-mail.ts` sends the mail over SMTP (`nodemailer`) with
   five-second connection, greeting and socket timeouts. Success means the
   mail server accepted the message.

The privacy page (`/{locale}/privacy`) linked from the form describes exactly
this processing; keep the two in sync when the flow changes.

## The mail

```text
From:     Jana Nováková (web) <{SMTP_USER}>
To:       {CONTACT_TO_EMAIL or siteConfig.email}
Reply-To: Jana Nováková <visitor@example.com>
Subject:  Poptávka z webu – Jana Nováková

Jméno: Jana Nováková
E-mail: visitor@example.com

<message>
```

The mail reads like one the visitor wrote, and answering it is one click.

- **It is in the visitor's language** — the locale of the page they sent it
  from — because they see it again, quoted under the reply. Subject and
  labels are copy (`contact.mail` in `messages/<locale>.json`); the action
  loads them for the posted locale.
- **The subject names the page the form was on:**

  | Page | Czech | English |
  | --- | --- | --- |
  | Landing page | Poptávka z webu – {name} | Website enquiry – {name} |
  | App-security page | Poptávka z webu: bezpečnost aplikací – {name} | Website enquiry: app security – {name} |

  Every subject starts the same way, so one inbox filter catches all
  enquiries, and ends with the visitor's name, so mail apps that group
  messages by subject do not merge different enquiries into one thread.

- **`From` is always the authenticated mailbox, never the visitor's address.**
  A mail "from" the visitor's domain would be a forgery and fail that domain's
  DMARC. Only the display name carries the visitor's name, with "(web)" so
  form enquiries stand out.
- **`Reply-To` is the visitor's validated address**, so a reply goes straight
  to them.
- **Sender and recipient differ.** In production the site sends from
  `hey@smolikja.team` (the public address, which collects mail and forwards
  it) to `jakub@smolikja.team` (the inbox the owner answers from). Some
  clients — Gmail among them — ignore `Reply-To` on mail from one's own
  address and would answer the owner instead of the visitor.
- **The name is reduced to one plain line** in the headers and in the body:
  line breaks, control and invisible formatting characters (such as
  right-to-left overrides) become spaces, so a crafted name can neither add a
  header, fake a field nor disguise the sender. `nodemailer` encodes the
  headers.
- **There is no automatic confirmation to the visitor.** It would let anyone
  send the site's mail, with their own text, to an address they typed in; the
  success state on the page is the confirmation.

## Environment

| Variable | Requirement | Behaviour when missing |
| --- | --- | --- |
| `SMTP_USER` | Required | Every submission returns `error`; nothing is sent. Also the `From` address. |
| `SMTP_PASSWORD` | Required | Same as above. |
| `CONTACT_TO_EMAIL` | Recommended | Defaults to `siteConfig.email` in `src/config/site.ts`; set it to an inbox other than `SMTP_USER` (see above). |
| `SMTP_HOST` | Optional | Defaults to `smtp.purelymail.com`. |
| `SMTP_PORT` | Optional | Defaults to `465` (implicit TLS); any other port must offer STARTTLS, plain text is refused. Use `587` if the host blocks outgoing `465`. |

Empty variables count as unset. Local development uses `.env.local`;
production values live in Coolify. Misconfiguration and failed deliveries are
logged on the server with `console.error` — error codes only, never the
visitor's details.

The password belongs to the sending mailbox (`hey@`), not to the owner's main
inbox, so a leaked server environment does not expose the owner's mail. Give
it a long, unique password; better, turn on two-factor authentication for that
mailbox and use a Purelymail app password, which can be revoked on its own.

## Protection enforced by this web

- Honeypot: a non-empty `website` field receives neutral success without
  delivery, so scripts do not retry with the field left empty.
- Zod validation: name 2–120 characters, valid e-mail (lower-cased), message
  10–4000 characters. HTML form constraints mirror these for early feedback.
- Hashed-IP, process-local fixed windows of 3 messages per minute and 20 per
  day (`src/lib/rate-limit.ts`). Only valid submissions — the ones that would
  send mail — count, so a visitor correcting a typo never hits the limit. The
  IP comes from `cf-connecting-ip`, `x-real-ip`, the first `x-forwarded-for`
  hop or the `Forwarded` header, in that order; unknown clients share one
  bucket.
- A 32 KB Server Action body limit configured in `next.config.ts`.
- Five-second SMTP timeouts and TLS on every connection.

## Checking delivery

After deploying or changing the variables, send a message through the form,
then in the inbox check that it is not in spam, that it shows the visitor's
name, and that **Reply** addresses the visitor.

## Limitations

- Rate limiting is process-local: it resets on restart and is not shared
  between replicas. Add a shared store before running more than one instance.
- Forwarded IP headers are only meaningful when the proxy chain (Coolify's
  Traefik) is trusted to set them.
- There is no CAPTCHA and no server-side spam scoring; the mail provider's
  limits and the mailbox's filters are the next line of defence.
- Each message opens its own SMTP connection, which is fine at contact-form
  volume.
