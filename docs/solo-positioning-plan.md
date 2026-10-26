# Positioning plan: one person, building and securing apps

Date: 2026-10-08, revised 2026-10-26. Status: implemented on
`feature/redesign_v2`.

This plan supersedes the positioning, voice, information architecture and copy
parts of the [landing page redesign plan](landing-page-redesign-plan.md):
§1 brand decisions, §5, §6, the voice criteria in §10 and §11. That plan's
UX, accessibility and performance targets (§4), visual direction (§8),
implementation conventions (§9) and measurement (§10) still apply, as does the
[pricing research](landing-page-pricing-research.md).

Documentation is English. The customer-facing copy lives in
`messages/cs.json` (source of truth) and `messages/en.json`; this document
records the decisions behind it, not a second copy of the text.

## 1. Decision

smolikja.team presents **Jakub Smolík, one named person** working with a
**team of AI agents** (the "team" in the brand). The offer is one continuous
story told with four verbs: **work it out, build, secure, grow**. Security is
not a separate business next to development; it runs through the same work
and is also a standalone entry point (reviewing apps someone else or an AI
built). The owner wants security weighted at least as high as development,
because building apps will commoditise while securing them will not.

The owner is a generalist and flexible: the page invites any relevant enquiry
rather than narrowing to one specialisation, and the goal of the page is a
first message. Out of scope, and not to be implied: staff augmentation or
joining another company's team as an hourly developer.

Differentiators the page demonstrates:

1. **Advisor first.** Starts from the client's goal; "do not build yet" is a
   legitimate outcome.
2. **One accountable person** across ideas, build, security and care.
3. **Security from the first line**, grounded in real experience (§4).
4. **Small-studio capacity through AI agents**, with human review and a strict
   data rule (sensitive data only on local models).
5. **Long-term care**: first version → full product → growth.

## 2. Audience and market

Primary market: Czech Republic, then Slovakia; English is secondary. Primary
visitors are business owners, founders and startups with an idea, an app that
needs building or an app that needs checking. Secondary: companies adding AI
features, and suppliers asked to demonstrate security by their customers.

Market signals behind the security emphasis (checked 2026-10-26):

- Building apps with AI ("vibe coding") is trending in Czech searches too
  ("vibe coding co to je", "vibe coding kurz").
- Veracode's 2026 GenAI code security research reports an average security
  pass rate of only 56% for AI-written code
  ([SD Times](https://sdtimes.com/agentic-security/veracode-finds-ai-generated-code-security-has-barely-improved-since-last-year/));
  the security page quotes this with its source.
- The 2026 OWASP GenAI/LLM Top 10 keeps prompt injection first and moved
  excessive agency up
  ([SD Times](https://sdtimes.com/security/prompt-injection-tops-2026-owasp-genai-llm-top-ten-vulnerabilities/)).
- Czech Act No. 264/2025 Coll. (NIS2) applies from 1 November 2025 and
  stresses supply-chain security; CRA reporting obligations apply from
  11 September 2026. Both create demand for suppliers who can document
  security; the page offers the technical part only, never legal advice.

## 3. Voice

Researched against Czech agencies and individuals (§9): Czech sites address
the reader with *vykání*, use short sentences, explain benefits rather than
methodology, keep the homepage around 800 words, and use low-pressure calls
to action ("napište mi", "zdarma · bez závazků", "nemusíte mít zadání").

- **First-person singular**, masculine Czech forms, formal "vy". A joint "we"
  for the client and Jakub together is fine; a supplier "we" is not.
- **Primary action:** "Konzultace zdarma" ("Free consultation"), identical
  everywhere, with a highlighted callout "Úvodní konzultace zdarma · 60–90
  minut, bez závazků" beside it. The free consultation applies to development
  and security.
- **Less is more in the hero**: name badge, headline, one sentence, the action
  and the callout — nothing else. No availability line (it read as "I have no
  work") and no caption under the screens.
- **AI**: "tým AI agentů"; AI speeds up the work, Jakub decides, reviews and is
  accountable. No tool names or workflow internals.
- **Security wording**: "kontrola bezpečnosti", "zabezpečení", "bezpečnostní
  revize" — never "certifikovaný penetrační test" or "audit podle zákona".
- **Flexibility**: no fixed process on the page; principles instead.
- Unchanged: no prices, response times, capacity numbers, client quotes,
  client names or results the owner has not confirmed.

## 4. Security positioning and its limits

Real basis the page may state: more than five years of iOS work for banks and
the public sector (biometric signing, secure document handling); as technical
lead on his own client projects, securing servers, app–backend communication
and communication with building control systems; building apps end to end,
so findings can be fixed directly.

Not claimed: certifications, a track record of security reviews for third
parties, penetration testing, formal audits or legal interpretation. The page
says so explicitly ("Co nedělám").

Operating rules the page commits to (and the owner should follow):

1. Scope and permission to test confirmed in writing before any test.
2. Every finding verified manually and documented; nothing unconfirmed in a
   report.
3. Client code goes to cloud AI only with consent; sensitive parts only on
   local models.

Recommended before the first security engagements (not on the page):
professional liability insurance and a template for the written
authorisation; a lawyer to refer NIS2/CRA legal questions to.

## 5. Page structure

**Landing page** (`/cs`, `/en`), about 1,150 visible words (the FAQ answers
are collapsed), mostly in short cards. Every section, on both pages, is at
least one viewport tall so each topic has room to breathe:

| # | Section | Purpose |
| --- | --- | --- |
| 1 | Hero | Name badge, "Pomůžu vám vymyslet, postavit a zabezpečit aplikaci.", one sentence, CTA, free-consultation callout, two screens in iPhone mockups side by side, the back one smaller and shuffled to the front (animated) when pointed at or tapped |
| 2 | Služby `#services` | Four cards: Vymyslet · Postavit · Zabezpečit · Rozvíjet; "Zabezpečit" is filled with the brand colour and has a prominent button to the security page |
| 3 | Zkušenosti `#work` | Screens in iPhone mockups on a full-bleed strip driven by page scroll: when it reaches the middle of the screen it pins, scrolling moves it sideways until the last device meets the right content edge, and a progress bar across the content width fills; centred captions; screens grouped by app with the most striking first (layout modelled on [sklad3d.cz](https://sklad3d.cz/cs#member-oxoo)); then six cards by kind of project (§6) |
| 4 | Bezpečnost `#security` | Why now, four checks, honest note, link to the security page |
| 5 | Jak spolupracuji `#approach` | No fixed process; free consultation; three principles |
| 6 | O mně `#about` | Portrait, bio, AI and data rule, three assurances |
| 7 | FAQ | Eight questions, including price, timing, reviewing others' apps, solo, being unavailable and AI/data |
| 8 | Kontakt `#contact` | "Co řešíte? Napište mi." and the form |

**Security page** (`/cs/bezpecnost-aplikaci`, `/en/app-security`): its own
search intent and share image. Intro with the sourced statistic → who it helps
→ six services → five-step review process → why me and what I don't do →
security FAQ → contact form.

The scroll-driven strip is the owner's explicit choice and replaces the
redesign plan's "no scroll hijacking" rule for this one element. It is built
as scroll-linked motion, not hijacking: the page keeps native scrolling and
keyboard behaviour, and visitors who prefer reduced motion get a plain
horizontally scrollable strip.

Navigation: Služby · Zkušenosti · Bezpečnost (the page) · O mně, and the CTA.
On phones the header shows only the logo and menu; the CTA lives in the menu,
the hero and the contact section, so nothing overflows at 320 px.

## 6. Work section rules

- Experience is presented by kind of project, never as named cases: no client
  names, no product names, no confidential details (for the startup MVP the
  page says it shipped to the App Store in two weeks and that its data fed
  discovery that set the product's direction — not what that direction was).
- Screens are supplied anonymised by the owner and stored under neutral file
  names (`public/assets/work/`). The smart-home dashboard's empty top half is
  a one-handed-use feature and its caption says so.
- Kinds of projects: smart buildings and IoT, agriculture (B2B), startup MVP,
  public map app, banking and public sector (no screens), websites and AI
  tools (no screens).

## 7. AI communication

Published: that he works with AI agents, the kinds of work they do, the
benefit, who decides and reviews, and the data rule. Not published: tools,
prompts, agent setup or workflow specifics (the owner's know-how).

## 8. SEO

Google autocomplete for Czech (2026-10-26) shows how people phrase the need:
"vývoj aplikace", "vývoj aplikace cena", "vývoj aplikace na míru", "vývoj
mobilní aplikace (cena)", "mobilní aplikace na míru", "tvorba mobilní
aplikace", "mvp aplikace / co je mvp aplikace", "flutter vývojář";
for security "kybernetická bezpečnost pro firmy", "audit kybernetické
bezpečnosti", "kontrola bezpečnosti webu", "bezpečnost webu", "zabezpečení
aplikace", "nis2 koho se týká". "Bezpečnost aplikace" alone is dominated by
consumer questions (WhatsApp, Temu), so the security page targets "kontrola
bezpečnosti aplikací a webů" and AI-built apps instead.

Mapping: the landing page targets development phrases (title "vývoj a
zabezpečení mobilních aplikací", FAQ "Kolik stojí vývoj aplikace?"); the
security page targets review and security phrases. Both have FAQ and
structured data (`Person` with two offers; `Service` and `FAQPage` on the
security page), localized hreflang and sitemap entries.

Next steps, outside the code: verify the site in Google Search Console after
launch and read the real queries; check volumes in Google Keyword Planner or
Marketing Miner; occasional articles answering specific questions (e.g.
checking an AI-built app, what the CRA means for app owners); align LinkedIn;
list on firmy.cz and a Google Business Profile without a public address.
Organic search is a slow supplementary channel; LinkedIn and referrals come
first.

## 9. References (checked 2026-10-08 and 2026-10-26)

| Reference | What was taken |
| --- | --- |
| [Futured](https://www.futured.app/cs), [Ackee](https://www.ackee.cz/), [Dvojka Studio](https://dvojkastudio.cz/) | Czech agency tone: vykání, short sentences, ~800-word homepages, little or no process on the homepage |
| [inprogress.cz](https://inprogress.cz/) | Czech individual: first person, "Popište mi…", "zdarma · bez závazků", anonymised clients |
| [Michal Špaček](https://www.michalspacek.cz/), [Martin Michálek](https://www.vzhurudolu.cz/martin) | Czech individuals in security and consulting: personal, brief, first person |
| [Vincent Schmalbach](https://www.vincentschmalbach.com/services/software-development-company/), [ekky.dev](https://ekky.dev/blog/solo-developer-vs-mvp-agency-260625/), [Hanchor](https://www.hanchorllc.com/about/) | International solo developers: named person, AI as leverage with human accountability, explicit continuity answers |
| [The Swarm](https://theswarm.at/supabase-rls-audit/), [Codechoicez](https://codechoicez.com/vibe-coded-app-audit) | Security reviews for AI-built apps: problem first, concrete checks, fixes as the main value, saying what the review is not |
