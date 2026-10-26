# Solo positioning plan

Date: 2026-10-08. Status: implemented on 2026-10-08 on `feature/redesign_v2`;
project case texts are a later phase (§7).

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

smolikja.team presents **Jakub Smolík, one named person**. The offer is to
help businesses work out whether a digital product makes sense for them, and
if it does, to design, build, release, maintain and grow it. The work is done
with a **team of AI agents**; the "team" in the brand refers to them. Mobile
applications are the main specialisation within digital products in general
(mobile and web applications, administration, backends and integrations).

The owner's thesis is that businesses will increasingly look for one capable,
AI-enhanced person rather than an agency. This is a market bet, not measured
data; validate it in sales conversations. A named, accountable individual is
also the truthful description of the business.

Out of scope, and not to be implied: staff augmentation, joining another
company's team as an hourly developer, or isolated tasks on someone else's
product without product responsibility. Taking over and maintaining an existing
application is in scope as a product the owner becomes responsible for.

Differentiators the page demonstrates, in this order:

1. **Advisor first.** The work starts from the client's goal, not from an app.
   Recommendations rest on research and compared options, and "do not build
   yet" is a legitimate outcome.
2. **One accountable person for the whole lifecycle.** No handoffs between
   sales, project management, design and development.
3. **Small-studio capacity through AI agents**, without agency overhead, with
   human judgement and review over all of it.
4. **Experience from demanding environments** such as banking, public sector and
   enterprise, applied to smaller businesses.
5. **Long-term care.** After launch the product keeps evolving: first version →
   full version → further development and scaling.

## 2. Audience and entry points

Primary: a Czech business owner or founder, often running a traditional offline
business, with a goal, idea or operational problem who may not know what to
build or how large a first version should be. Secondary: a client who knows
exactly what they want, and the owner of an existing app that needs a new
responsible developer. Slovakia remains a secondary market.

The four situations ("nevím, jestli a co stavět", "vím přesně, co chci",
"chci to nejdřív ověřit", "už mám aplikaci") join one four-stage lifecycle at
different stages; the page shows this as the "Kde začneme" list.

## 3. Voice and vocabulary

- **First-person singular**, masculine Czech forms, formal "vy" to the reader.
  Let the verb carry the person; do not open sentences with "Já". English uses
  plain "I".
- **No supplier "we"** and no headcount. A joint "we" meaning the client and
  Jakub together is natural and fine ("domluvíme se", "jak na tom jsme").
- **AI**: "tým AI agentů" / "AI agenti". AI speeds up the work; Jakub decides,
  reviews and is accountable. Never "AI vyvine vaši aplikaci", no speed
  multipliers, no tool names or workflow internals (§6).
- **Digitální produkt** is the umbrella term, **mobilní aplikace** the most
  common case. MVP is explained on first use as "první verze s tím
  nejdůležitějším"; prefer "ujasnění zadání a návrh" to "discovery".
- **Advisor tone**: calm, honest, evidence-based, openly willing to recommend
  not building.
- **No freelancer vocabulary**: "na volné noze", "hodinová sazba", "posílím
  váš tým".
- Unchanged: no prices, response times, capacity numbers, client quotes or
  results the owner has not confirmed.

## 4. Brand and identity

- The brand, domain, wordmark and every historical `/assets/*` path stay. The
  about section explains the name once: "smolikja team: já a můj tým AI
  agentů."
- **Jakub Smolík** is named in the hero badge, about, contact, metadata,
  structured data (`Person`) and footer.
- **Photos** (`public/assets/about/`): the portrait appears large in the about
  section and as a small decorative avatar in the hero and contact badges; the
  workspace photo illustrates the AI paragraph. The owner supplied both without
  generator metadata on 2026-10-08. The workspace photo is AI-enhanced from a
  real photo of the actual workspace; keeping it is the owner's decision.
- Contact address stays `smolikja@protonmail.com` until a domain address is
  actually configured. The footer links the owner's LinkedIn; the profile is
  still oriented towards business roles and should be aligned later.

## 5. Page structure

Navigation: **Projekty · Spolupráce · O mně** and the primary CTA **Probrat
nápad** (`#contact`, an enquiry, not a booking). Anchors: `#projects`,
`#process`, `#about`, `#contact`.

| # | Section | Visitor's question | What it shows |
| --- | --- | --- | --- |
| 1 | Hero | Am I in the right place, and who is this? | Name badge, advisor-first headline ("Pomůžu vám zjistit, co má smysl postavit. A pak to postavím."), AI line, CTA, free introduction, availability, real product screens |
| 2 | Projekty `#projects` | Has this person built real things? | Existing case stories; text changes deferred (§7) |
| 3 | Spolupráce `#process` | Where would we start, what comes next? | Free introduction, "Kde začneme" entry list, four stages (Rozhodnutí → Návrh → Vývoj a spuštění → Provoz a rozvoj) with outputs, one scope line, handover note |
| 4 | O mně `#about` | Who exactly will I work with, and can I rely on them? | Portrait and bio, "Jak pracuju s AI agenty" with the data-handling rule, three assurances |
| 5 | FAQ | What would stop me writing? | Eight questions, including "Proč jeden člověk, a ne agentura?", "Co když nebudete k dispozici?" and "Jak používáte AI a co je s mými daty?" |
| 6 | Kontakt `#contact` | What now? | Name badge ("Odpovídám osobně."), free introduction, availability, form, direct e-mail |
| Footer | Legal and utility | — | Navigation, privacy, LinkedIn, language, operator identity |

The former standalone scope section became the scope line in section 3, and
"Tým pro váš produkt" became section 4.

Notes on specific decisions:

- **Hero.** The name badge sits above the headline, so the supporting text does
  not repeat "Jsem Jakub Smolík". The product screens stay the main image:
  they are the proof that real products ship.
- **Availability** is one line in the hero and the contact section, switched by
  `siteConfig.availableForNewProjects` (`availability.open` / `.busy`). No
  capacity numbers; scope and timing are agreed individually.
- **Lifecycle.** Stage 1 (decision) is the advisory offer: goals, users,
  market and competitor research, options from an off-the-shelf tool to a
  product of the client's own, and a recommendation that may be "don't build
  yet". The commercial model is unchanged: free introduction, then paid stages
  with agreed scope; a fixed price for defined scope or a budget ceiling for
  iterations; maintenance agreed separately.
- **Bio** uses facts from the owner's LinkedIn export (6+ years, banking,
  public sector, enterprise, own clients in agriculture and smart homes). It
  names no employer or employer's clients.
- **Assurances** state only the practices the owner confirmed on 2026-10-08:
  code handed over at agreed milestones or kept in the client's repository;
  store accounts and production servers owned by the client (MVPs and test
  environments may run on the owner's infrastructure, hence "produkční");
  mainstream technologies, detailed documentation and a proper handover; plans
  with a buffer, holidays announced in advance. There is no named substitute
  developer, so the page does not promise one. Specifics belong in each
  client's contract, which the page says.

## 6. How much to say about AI

The owner's practice (2026-10-08): general-purpose cloud models for discovery,
general structures and non-sensitive work; local models on the owner's own
computer for anything with sensitive data or client know-how, so that
information never leaves it. Large-model reasoning is applied to abstracted,
non-sensitive input and the sensitive parts are merged back locally.

Published: that the owner works with AI agents, the generic categories of work, the
benefit (small-team scope, speed, no agency overhead), who decides and reviews,
and the data rule above ("citlivá data a know-how zpracovávám jen lokálními
modely… do cloudových AI nástrojů je neposílám"), plus agreeing at the start
what counts as sensitive and an optional NDA.

Not published: tool names, prompts, agent setup or workflow specifics. That is
the owner's competitive know-how, and visitors do not evaluate it anyway.

## 7. Next phase and known gaps

- **Projects content phase.** The owner has more applications than the current
  three and will supply them with their texts. Until then only the grammatical
  person of the existing case texts changed. When adding projects, keep two or
  three full stories and add compact entries for the rest; confirm per case
  whether the credit is "Návrh a vývoj" or "Vývoj".
- **Header reflow below 390 px.** The animated wordmark (fixed 9.75 rem) plus
  the header CTA and menu button overflow every viewport narrower than about
  380 px (by about 60 px at 320 px, so 360–375 px phones too). This predates
  this change (it came with the animated wordmark) and needs a fix before
  release, for example hiding the header CTA below 390 px, since the menu and
  the hero repeat it, or a narrower wordmark on small screens.
- **LinkedIn** should be aligned with this positioning before relying on it as
  proof.

## 8. Competitor references (checked 2026-10-08)

Observations of public pages; their conversion performance is unknown.

| Reference | Observed approach | Lesson |
| --- | --- | --- |
| [Vincent Schmalbach](https://www.vincentschmalbach.com/services/software-development-company/) | "Hire the senior developer directly"; "AI writes a lot of my code. I plan the work, make the technical decisions, and read and test every change"; headshot; client-owned code and accounts; three engagement models | Closest model: named person, AI as leverage with human accountability, explicit continuity answer |
| [ekky.dev](https://ekky.dev/blog/solo-developer-vs-mvp-agency-260625/) | AI-native solo engineer, headshot, fixed-scope packages; handles the bus factor with client repo from day one, standard patterns, handoff docs | Address the solo risk with concrete practices |
| [Hanchor](https://www.hanchorllc.com/about/) | Studio name plus "I'm Hunter Hillegas"; "no account layer, no handoff maze, no process theater"; named apps | Brand plus a face; directness as the benefit |
| [SOLOFOUNDER](https://clutch.co/profile/solofounder) | "One person, responsible from the first sketch to what ships"; product, code and data stay with the client; mixes "I" and "we" | Strong accountability line; mixed voice weakens it |
| [inprogress.cz](https://inprogress.cz/mvp-vyvoj.html) | Czech solo developer in the first person; MVP in 5–8 weeks from CZK 80,000; no photo or portfolio | Direct local competitor selling MVPs as a commodity; differentiate on advice, real products and long-term care |
| [Dvojka Studio](https://dvojkastudio.cz/) | Two-person studio using "my", no photos | A faceless small "we" is what the previous page resembled |
