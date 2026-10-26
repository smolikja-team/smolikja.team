# Landing page redesign plan

> **Superseded in part (2026-10-08).** The owner now presents himself as one
> named person working with a team of AI agents. Positioning, voice,
> information architecture and copy (§1 brand decisions, §5, §6, the voice
> criteria in §10 and §11) are replaced by the
> [solo positioning plan](solo-positioning-plan.md). The remaining sections
> still apply.

Date: 2026-09-15. Updated with the owner's team, portfolio and commercial
direction. Status: implemented in the landing page on 2026-09-15 (see the
[architecture](architecture.md) and [remaining inputs](#11-remaining-implementation-inputs));
pricing recommendations remain proposals.

This document plans a repositioning and redesign of the existing landing page.
It does not implement the redesign. Documentation follows the repository's
English convention; proposed customer-facing copy is Czech.

## 1. Recommendation

Position smolikja team as a small mobile product studio that helps a business
decide what to build, release a focused first version, and improve it as the
business learns. Make the mobile application the lead service. Present its
administration, backend, integrations, release and maintenance as supporting
parts of the same delivery.

The primary audience is a Czech founder or business owner with a product,
service or operational problem and an incomplete application brief. They may
run an established business; they do not need to identify as a technology
startup. Slovakia is a secondary market. Existing product development and
larger applications remain possible, but do not lead the homepage narrative.

The primary conversion is a relevant enquiry that can become a first
conversation. Secondary evidence is project engagement. Discord membership,
recruiting and developer community participation leave the landing page.

Suggested positioning sentence:

> Pomáháme firmám proměnit nápad v mobilní aplikaci. Od ujasnění zadání přes
> první verzi až po další rozvoj.

The differentiation to demonstrate is a responsible delivery team, a manageable
initial scope, and continuity after launch. Smolikja is presented as the agency
delivering the applications. The applications retain their own product identities;
their ownership structure is not the organising principle of the portfolio.

### Confirmed brand and portfolio decisions

- Speak consistently as **we**: Czech first-person plural and equivalent English
  team language. Use "navrhujeme", "vyvíjíme", "postaráme se" and "náš tým".
- Use a professional, neutral team identity throughout the page, including
  contact, project stories, metadata and any future proposal copy. A founder
  portrait or first-person singular story is not the page's trust mechanism.
- Show Smolikja's delivery responsibility, process and continuity. Describe
  concrete practices only when they are in place; team wording alone does not
  establish backup capacity, headcount or continuous support availability.
- Include **Studánky, Domov pod palcem and Inteligentní stáj**, plus future
  application projects supplied by the owner. Remove **Flutter Auth Flow** from
  the portfolio entirely; it is a package, not a featured application delivery.
- Present every application as a solution delivered or developed by Smolikja.
  Use the same template whether the product operator is an unrelated company,
  the owner as an individual, or another entity. Do not label a case as an
  "internal project" merely because of ownership.
- Keep delivery attribution separate from lifecycle status: a project being
  developed by Smolikja can still accurately be marked "ve vývoji".

### Business model to clarify before final copy

- The initial conversation and introductory review are free. The owner is open
  to spending more time, including an on-site visit, where appropriate. Recommend
  a usual 60–90 minute meeting and agreeing on longer sessions individually;
  do not advertise an unlimited free day or two of analytical work.
- Competitor analysis, customer research, product definition and design are
  paid work with an agreed scope and price. A simple, clear brief may go directly
  to a development proposal without a mandatory separate discovery purchase.
- Discovery has independent value: a product brief, prioritised scope,
  prototype or feasibility finding, and an estimate for the next stage.
- The outcome can be a smaller experiment, a web solution, or a decision not
  to build yet. Building a mobile app should follow the customer's need.
- A first release tests a concrete use case. It does not guarantee demand,
  customers, revenue or product-market fit.
- Subsequent delivery and maintenance are agreed services. Growing alongside
  a client does not imply equity compensation, revenue sharing, free work or
  an indefinite commitment.
- Pricing, minimum engagement, response times, ownership terms and available
  capacity remain unconfirmed. Do not publish invented numbers or guarantees.

Recommended commercial path: **free introduction → paid definition/research
when needed → fixed-price defined delivery or iterations with a budget ceiling
→ agreed maintenance and development**. The distinction between fixed delivery
and a recurring capacity retainer must remain clear. See the
[pricing research and recommendation](landing-page-pricing-research.md) for
public Czech examples, the owner's CZK 50,000 case, suggested internal ranges
and the exact wording recommended for the landing page.

## 2. Evidence and current-page audit

The audit inspected repository content, composition, styles, contact integration
documentation and representative project images. Tapptitude and Futured were
also inspected in a desktop browser. It is not a traffic analysis or a measured
conversion audit. A local preview could not start because the environment
rejected binding port 3100; no claims here depend on a local runtime test.

| Evidence in the repository | Implication for the redesign |
| --- | --- |
| `hero.tsx` fills the viewport with the logo video; `site-header.tsx` hides navigation until the hero is mostly gone | Put the offer and contact action in the initial view, with navigation available immediately |
| `statement` introduces the actual service after the hero | Move that information into the hero and make the customer's starting point explicit |
| Four projects, including an open source authentication package | Present all three application deliveries; exclude the authentication package and allow future applications to use the same case template |
| Project descriptions emphasise features and WebSocket implementation | Describe the user's problem, the team's responsibility and the observable outcome |
| About copy promises marketing, commercial launch and fully in-house delivery | Verify these separately; the brief supports technical delivery but does not establish every marketing or staffing claim |
| Community card and Discord contact channel | Remove both from the landing page, along with its Discord structured-data link |
| A black-only theme tied to the video and a Discord-derived accent | Rebuild the theme around the product presentation |
| Instrument Sans, semantic tokens, typed translations and small client islands already exist | Retain these foundations; no framework migration is necessary |
| Contact Server Action, validation, rate limiting and Resend integration exist | Reuse the integration and improve the customer-facing flow; deployment delivery has not been tested during this research |

Relevant implementation references:
[page composition](../src/components/landing/landing-page.tsx),
[current copy](../messages/cs.json),
[project assets and dimensions](../src/config/projects.ts),
[contact contract](contact-form.md),
[stack conventions](stack-blueprint.md), and
[localisation conventions](localization.md).

## 3. Agency references and transferable lessons

These are observations of public websites, followed by design recommendations.
Their conversion performance has not been independently verified.

| Reference | Observed approach | Application to Smolikja |
| --- | --- | --- |
| [Tapptitude](https://tapptitude.com/) | Product stories, a concept/build/scale process and different engagement models; a large typographic hero with a visible project CTA | Explain the product journey and support it with work. Keep one main engagement path for the intended customer |
| [Futured](https://www.futured.app/cs) | Czech mobile specialist positioning, prominent typography and an extensive project portfolio | Show a clear mobile focus and real product imagery. Select a few relevant stories appropriate to this studio's scale |
| [Ackee](https://www.ackee.cz/) | Direct Czech service language; mobile, web and design capabilities | Explain breadth in language a business owner understands, with mobile applications leading |
| [Miquido Product Bootcamp](https://www.miquido.com/services/product-bootcamp/) | Discovery is a defined engagement with workshops, prototyping and testing | Give the initial discovery stage a tangible output. Define a smaller studio's own scope rather than copying its duration or claims |

Design inference: the most useful shared structure is a clear offer, evidence,
an understandable working process and an accessible contact. Agency scale,
award collections, financing figures and service mega-menus do not transfer
automatically to Smolikja.

## 4. Apple and web UX as of September 2026

Apple's 11 September 2026 announcement describes iOS 27 design refinements,
responsiveness and more ways to personalise Liquid Glass. This is a dated
reference for the current direction, not a claim that a new aesthetic alone
improves lead generation.
[Apple September announcement](https://www.apple.com/li/newsroom/2026/09/get-ready-to-experience-iphone-18-pro-the-new-apple-watch-lineup-and-airpods-5/).

Apple's current Human Interface Guidelines place Liquid Glass in a distinct
layer for controls and navigation, advise sparing use, and distinguish it from
content surfaces. Translate that hierarchy into the website: a lightly
translucent navigation surface can sit above solid, legible page content.
This is a web interpretation, not a native Liquid Glass implementation.
[Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials).

Recommended expression:

- Large, carefully composed product imagery and readable typography.
- Clear separation of navigation, text and product demonstrations.
- Restrained depth and consistent spacing; the actual apps supply most colour.
- Short feedback animations that explain an interaction.
- A fully usable solid-background fallback for translucent navigation.

The working web quality target is WCAG 2.2 AA, including keyboard access,
visible and unobscured focus, sufficient contrast, reflow and clear form
feedback. Check normal text at 4.5:1, large text and relevant interface
boundaries at 3:1. Use at least 48 CSS-pixel hit areas for primary mobile
controls as this project's design target, not a claim about the WCAG AA
minimum. [W3C WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/).

Performance targets are LCP at most 2.5 seconds, INP at most 200 milliseconds
and CLS at most 0.1 at the 75th percentile of real visits, segmented by device
type. Validate a production build in the lab before release; field performance
requires actual traffic and sufficient data. A Lighthouse load test alone does
not establish real-user INP. [Google Web Vitals](https://web.dev/articles/vitals).

## 5. Information architecture

### Initial release

Use one focused landing page in both existing locales, with optional project
detail pages added when their content is ready. Czech is the editorial source
of truth. Retain `/cs`, `/en`, the existing language switch and bare-root
redirect behaviour. A separate Slovak locale is unnecessary for the first
release; evaluate it when there is a dedicated acquisition/content need.

Desktop navigation: **Projekty · Jak spolupracujeme · O nás** and primary CTA
**Probrat nápad**. Add a compact mobile menu with the same destinations and an
immediately available contact action. Preserve `#projects`, `#about` and
`#contact`; introduce the process anchor in structural configuration.

| Order | Section and customer question | Proposed content and behaviour |
| --- | --- | --- |
| 1 | Hero: "Am I in the right place?" | Mobile app offer, audience, reassurance that a finished brief is unnecessary, primary CTA and one real product composition |
| 2 | Application deliveries: "Can you deliver something relevant?" | All three current applications, each with clear Smolikja attribution, status and 1–2 meaningful images; the same structure accommodates future projects |
| 3 | From idea to release: "Where would we start?" | Free introduction as the entry point, then three delivery stages: definition/design where needed, first usable version, further development; explain when paid work begins |
| 4 | Complete product: "Who handles the rest?" | One short explanation of mobile app + administration + technical background, rather than a separate catalogue of infrastructure services |
| 5 | Team and collaboration: "How will the team deliver?" | Agency voice, responsibility, communication and real practices that support continuity; customer quote if available |
| 6 | FAQ: "What would stop me getting in touch?" | Five or six concrete questions about incomplete briefs, cost, timing, administration, existing products and ongoing care |
| 7 | Contact: "What do I do now, and what happens next?" | Short form, team email, free introductory conversation and a truthful explanation of the next step |
| Footer | Business identity and utility navigation | Brand, location, operator details supplied by the owner, privacy information and language switch |

Aim for roughly 1,000–1,500 Czech words including FAQ and project summaries,
then edit against the actual wireframe. This is a working content budget, not
a conversion rule. Sections 3 and 4 can be visually connected, and the team
section should be brief.

### Page map

```text
/cs or /en
  offer
  #projects
  #process       proposed structural anchor
  product scope
  #about
  FAQ
  #contact

Later, if supported by real content:
/{locale}/projects/{slug}   one reusable route template for application deliveries
/{locale}/privacy          verified operator and processing information
```

Privacy information should be available when the form launches. Reuse an
existing appropriate destination if supplied; otherwise prepare the proposed
localised page. Do not create empty service or case-study routes. Add deeper
service pages only when they answer a distinct buyer need and have substantial
content. Community content can have its own destination in a later project.

## 6. Proposed Czech copy and contact UX

Copy framework: a customer with a product goal meets a capable guide, sees
evidence and a concrete plan, and takes a small first step. Use calm, direct
Czech with consistent formal address and first-person plural agency language.
Explain MVP on first use as the first
usable version focused on the essential use case.

### Hero

**Headline**

> Proměníme váš nápad v mobilní aplikaci.

**Supporting copy**

> Pomůžeme vám ujasnit, co má aplikace řešit, navrhneme první verzi pro iOS
> a Android a postaráme se o její další rozvoj.

**Primary CTA:** Probrat nápad

**Secondary text link:** Prohlédnout projekty

**Reassurance:** Nemusíte mít hotové zadání. Stačí popsat, co chcete zlepšit.

Near the main action or contact: **Úvodní konzultace zdarma.** Keep the main
action label **Probrat nápad** consistent; the reassurance explains its terms.

Use a small factual project caption as initial proof. Add a client logo or
testimonial only when attribution and permission are established.

### Problem and fit

Do not add a large fear-based problem section. A short passage can identify
the customer's situation:

> Máte službu, kterou chcete dostat do mobilu? Produkt, ke kterému chybí
> aplikace? Nebo nápad, u kterého potřebujete najít správný první krok?

### Solution and how it works

Working heading: **Začneme tím, co má smysl ověřit.**

Entry point before the paid delivery stages:

> Nejdřív se seznámíme s vaším nápadem a situací. Úvodní konzultace je zdarma.
> Pokud bude potřeba podrobnější analýza nebo návrh, předem domluvíme jejich
> rozsah a cenu.

| Stage | Suggested customer-facing explanation | Concrete output to agree |
| --- | --- | --- |
| Ujasníme zadání a navrhneme řešení | Podle domluveného rozsahu prověříme potřeby uživatelů, konkurenci a navrhneme, co má první verze umět. | Paid product brief, research and/or key flow/prototype as agreed, prioritised scope, estimate and next-step decision |
| Postavíme první použitelnou verzi | Soustředíme se na hlavní potřebu uživatelů. Aplikaci průběžně ukazujeme a připravíme ji k uvedení. | Working app, necessary supporting systems, testing and agreed distribution/release |
| Rozvíjíme podle skutečného používání | Po spuštění řešíme provoz a další úpravy plánujeme podle zpětné vazby a potřeb vašeho podnikání. | Agreed support, product feedback, priorities and further releases |

This is a proposed delivery model to align with the owner's real practice.
Store publication, review timing and discovery scope depend on the project.
Explain the handover between stages; the first conversation does not require
the client to commit to the entire lifecycle.

### Complete product

Working heading: **Aplikace i zázemí, které potřebuje.**

> Podle potřeby připravíme také webovou administraci, propojení s vašimi
> systémy a provoz aplikace. Jednotlivé části navrhneme tak, aby spolu fungovaly.

Use three modest connected elements: mobile application, administration and
technical background. A real administration screenshot is useful if available.
An explanatory diagram must be recognisable as a diagram; never present an
invented administration UI as delivered client work.

### Team and working relationship

Use the agency as the speaking subject. Suggested heading: **Tým pro váš
produkt.** Working copy:

> Propojíme návrh, vývoj a provoz do jedné spolupráce. Průběžně s vámi
> řešíme priority, ukazujeme hotovou práci a domlouváme další kroky.

Explain practical collaboration, shared project context and clear responsibility.
A team or working-session image is optional and must depict actual people or
work; a neutral process composition is a valid alternative. No founder hero,
singular "I will build it" story or invented headcount is needed.

Continuity should come from actual delivery practices: shared repositories,
documented decisions, access management and handover material; a backup
collaborator where one is genuinely available. These are internal implementation
recommendations, not automatically approved public claims. Publish the relevant
practices once established. Confirm a demonstration cadence before promising it.

### Social proof

Place proof next to the relevant case. Recommended structure:

- Named product and current stage.
- Problem and intended users.
- Exactly what Smolikja delivered and what was supplied by others.
- One meaningful design/product decision.
- Verifiable result, release link or attributed customer quote.

There is no placeholder testimonial copy. If no client quote or usage result
is available, show truthful scope and a working product example.

Delivery attribution is not evidence of an independent customer endorsement.
Use a real product/operator name if available; omit an unknown client field
rather than inventing a commissioning organisation.

### FAQ topics and answer direction

1. **Potřebuji mít hotové zadání?** No; the initial conversation is free. Distinguish
   this from separately agreed paid research/design.
2. **Kolik vývoj stojí?** Explain what determines scope and how a fixed price or
   budget ceiling is agreed. Launch without a blanket "MVP for CZK 50,000"
   package; publish ranges only after their scope and economics are validated.
3. **Jak dlouho trvá první verze?** Explain dependencies and when an estimate
   becomes possible. Do not borrow another agency's delivery promise.
4. **Postaráte se i o administraci a provoz?** Yes where included in the agreed
   delivery; explain the business purpose in one or two sentences.
5. **Co se děje po spuštění?** Explain agreed maintenance and prioritised
   improvement, without implying unlimited support.
6. **Můžeme navázat na existující aplikaci?** Explain assessment and agreement
   on the best next step; a rewrite is not the default recommendation.

Ownership, store accounts, access to source code and maintenance terms should
be settled commercially and can replace a lower-value FAQ once confirmed.

Suggested complete pricing answer:

> Cena záleží na tom, co má první verze umět a na jaké systémy se napojí.
> Po úvodní konzultaci navrhneme další postup. Pro jasně vymezené zadání
> nabídneme pevnou cenu; u postupného vývoje si domluvíme rozpočet a priority.

Suggested separate answer on the free/paid boundary, if visitors need it:

> Úvodní konzultace je zdarma. Podrobnější průzkum, analýzu a návrh řešení
> naceníme podle dohodnutého rozsahu. S placenou prací začneme až po vašem
> odsouhlasení.

### Final CTA and form

Working heading: **Co by měla vaše aplikace změnit?**

> Napište pár vět o svém nápadu nebo o tom, co dnes nefunguje. Ozveme se
> a domluvíme si úvodní konzultaci zdarma.

All **Probrat nápad** buttons lead to `#contact`. This is an enquiry flow,
not an implied calendar booking. Initial recommended fields are the existing
name, email and message; no required phone, budget, detailed brief or attachment.

Suggested message hint:

> Pro koho je aplikace a co má usnadnit? Pokud už máte představu o termínu
> nebo rozpočtu, můžete ji připsat.

Form submit: **Odeslat zprávu**. Show pending, validation, success and delivery
failure states clearly. Preserve entered text after failure and provide the
direct email fallback. Success confirms the enquiry, not an appointment.
Only state a response deadline if the owner can support it.

A scheduling link can be added later as an alternative if an actual calendar
and meeting format exist. Do not introduce a booking dependency for version one.

### Copy optimisation notes

- Keep technical acronyms out of headlines; place implementation detail in
  case studies or the subsequent conversation.
- Avoid unsupported superlatives, artificial urgency, invented project counts,
  guarantees and fake availability notices.
- Lead with the customer's product and uncertainty, then explain the studio.
- Use one name for the primary action throughout the page.
- Validate clarity through interviews before considering headline A/B testing;
  a small studio may not have enough traffic for a reliable experiment.

## 7. Project selection and image work

All three application projects below are included in the initial landing page.
Smolikja is the delivery agency for each. Ordering may follow relevance and
strength of available material, but ownership is not a reason to reduce a
project's visibility. Verify publishable scope and current use when writing
each case. Flutter Auth Flow is excluded from the portfolio.

| Project | Proposed role | Content and imagery work |
| --- | --- | --- |
| Domov pod palcem | Included delivery: a mobile interface for a physical product/service | Show a meaningful control flow and explain one-handed ergonomics. Inspect alternative screens before using the dashboard, whose current image devotes substantial space to an empty upper area |
| Inteligentní stáj | Included delivery: a specialist operational application | Explain the administrator's task, equipment control and alerts. Show a useful state and action; keep technical protocol detail in supporting copy |
| Studánky | Included delivery: a mobile product developed by Smolikja for its own product identity/operator | Use the same supplier case template. Current copy says in development; verify and retain the accurate stage. Favour a meaningful map/detail/report sequence |

Recommended Czech credit: **Vývoj aplikace: smolikja team**. When the confirmed
scope also includes design, use **Návrh a vývoj: smolikja team**. For an ongoing
relationship use **Vyvíjíme a rozvíjíme pro [značka]**, with a verified brand name.
An English **Built by smolikja team** credit can be used for a completed build;
**Development by smolikja team** also works for ongoing development.
**Powered by smolikja team** is possible but less precise because it can imply
a software platform or infrastructure provider rather than an agency.

For Studánky, a status-safe starting sentence is:

> Pro projekt Studánky vyvíjíme mobilní aplikaci pro sledování stavu přírodních
> pramenů a plánování výletů.

Present product purpose, delivery scope and stage without making the founder's
ownership part of the marketing story. A future operator entity should only
be named once it actually exists and the attribution is accurate.

Use a reusable project data/template structure for additional deliveries.
Each initial application should be visible without opening a carousel or a
"show more" control. As the portfolio grows, add compact entries and dedicated
case pages; do not silently drop current projects to preserve a two-case layout.

For each case, gather an 80–120 word landing summary, 2–3 meaningful screens,
delivery responsibility, current status and one substantiated result. Numerical
results require a source and time period. A shipped workflow or deployment can
be described accurately even when business metrics are unavailable.

Existing Studánky images are declared at 375×813 and Stable at 390×844;
Domov images are 1290×2796. Refresh low-resolution assets from a real build
when they need prominent high-density presentation. Do not upscale them to
fabricate detail. Keep historical `/assets/*` paths available; add new exports
and update structural configuration when using new IDs or dimensions.

Image production guidance:

- Select a readable application state rather than a splash screen.
- Use consistent framing, scale and padding while keeping each product's identity.
- Avoid adding a second status bar or device cutout around an image that
  already contains them.
- Label editorial close-ups and conceptual examples appropriately.
- A short recording can demonstrate a real flow later, with playback controls;
  it should not block the hero or replace written proof.
- Any application redesign is a separate scope. The landing page must not
  quietly turn altered app mockups into evidence of released client work.

## 8. Visual direction

### Recommended concept

A light, precise product presentation with the studio's real applications as
the visual centre. Use an asymmetric desktop hero: readable offer on the left,
one large real screen and one restrained supporting detail on the right.
Other sections remain calm so the product work is memorable.

Keep the current brand name. The existing monochrome wordmark can be used in
the first iteration through its `currentColor` implementation. Review its small
size legibility in the new composition; a new logo is not a prerequisite.

### Initial design tokens

Hex values below are design references. During implementation, convert into
the existing semantic OKLCH token system in `globals.css`; do not insert raw
colours into components.

| Semantic role | Starting reference | Purpose |
| --- | --- | --- |
| Background | `#F7F9FC` | Cool, light page canvas |
| Surface | `#FFFFFF` | Reading, form and product surfaces |
| Foreground | `#171C26` | Primary text |
| Muted foreground | `#596273` | Supporting text, subject to contrast testing |
| Primary | `#214EC7` | Main action and interactive emphasis |
| Subtle accent surface | `#EAF0FB` | Quiet grouping and illustration background |

The blue supports the mobile-product direction; it must have no Discord
association in copy or application. Evaluate it beside all three project
palettes before freezing it. The palette is a proposal, not a completed
contrast audit.

- **Typeface:** retain Instrument Sans with Czech character coverage. Use
  weight and scale rather than extra font families to establish hierarchy.
- **Starting type scale:** hero 64–80px desktop / 38–46px mobile; section
  headings 32–44px / 28–34px; body 18px; form text at least 16px. Tune around
  real Czech line breaks and enlarged text.
- **Text measure:** roughly 50–70 characters for explanatory paragraphs.
- **Layout:** 12-column desktop grid, maximum content width about 1200px,
  20–24px mobile gutters, generous but content-driven vertical spacing.
- **Shape:** roughly 12–16px controls, 24–32px product compositions; ordinary
  text sections do not each need a rounded card.
- **Header:** visible immediately; sticky with a subtle translucent surface
  only where useful, a solid fallback and no effect on text legibility.
- **Motion:** interaction feedback around 150–250ms; at most one restrained
  initial product entrance. No scroll hijacking, cursor replacement, background
  logo loop or autoplay case carousel.
- **Small screens:** offer and CTA precede imagery; preserve reading order.
  Use one strong product screen rather than shrinking a desktop collage.

These sizes and durations are starting design decisions to test, not universal
UX rules. Respect reduced motion, reduced transparency where supported, keyboard
navigation, safe areas and text zoom.

### Low-fidelity layout

```text
DESKTOP
┌────────────────────────────────────────────────────────────────┐
│ logo          Projekty  Jak spolupracujeme  O nás   [CTA] CS/EN │
├────────────────────────────────────────────────────────────────┤
│ Offer headline                  │                              │
│ Short explanation               │ Real application screen      │
│ [Probrat nápad]  Projects link   │ + supporting product detail  │
│ No finished brief needed        │                              │
├────────────────────────────────────────────────────────────────┤
│ Application deliveries: three stories; room for future work    │
├────────────────────────────────────────────────────────────────┤
│ Free introduction → agreed next step                           │
│ Paid definition/design  First version         Further growth    │
│ concrete output         concrete output       concrete output  │
│ Mobile application + administration + technical background     │
├────────────────────────────────────────────────────────────────┤
│ Team and process        How collaboration works / client proof │
├────────────────────────────────────────────────────────────────┤
│ FAQ                                                            │
├────────────────────────────────────────────────────────────────┤
│ Contact context         Name / email / message                  │
│ Direct email            [Odeslat zprávu]                        │
└────────────────────────────────────────────────────────────────┘

MOBILE
logo                           CTA / menu
Offer headline
Explanation
Primary CTA, secondary project link
Reassurance
One readable product image
All three application cases, in reading order
Free introduction and explanation of paid next steps
Three stages in reading order
Product scope
Team and working relationship
FAQ
Contact form and direct email
Footer
```

### Design review before implementation

The page should be identifiable by its real applications and a concrete
working relationship. If the result resembles a generic software template,
strengthen those two elements before adding decoration. Compare the hero and
one complete project story at desktop and mobile size. A light composition is
the recommendation; a restrained dark alternative can be compared only if the
real screenshots work substantially better against it.

## 9. Implementation plan for this repository

Keep the current Next.js, React, Tailwind, shadcn/Base UI and Motion stack.
No new runtime package is needed for the proposed first release. Existing
primitives, CSS and native scrolling cover the planned interactions. Avoid a
CMS, 3D renderer or another animation system unless a later requirement
justifies one.

Before writing application code, read the relevant installed Next.js guides in
`node_modules/next/dist/docs/`, especially Server/Client Components, Image,
metadata and any new routes. The installed version's documentation and
`package.json` are authoritative.

| Work package | Files / area | Completion condition |
| --- | --- | --- |
| 1. Confirm offer and evidence | This plan, case facts, optional real team imagery and commercial scope | Agency voice, all three delivery narratives and free/paid boundary are defined |
| 2. Finalise Czech content | `messages/cs.json`, `src/i18n/dictionary.ts`; later matching `messages/en.json` | Every section has final copy; English has equivalent intent; no unsupported promises |
| 3. Validate wireframes and visual direction | Desktop and mobile proposal, actual screenshots and tokens | Offer, evidence and contact are clear before product implementation |
| 4. Replace page composition | `landing-page.tsx`, `hero.tsx`, `site-header.tsx`, `statement-section.tsx`, `about-section.tsx` | Visible header, meaningful hero, phased offering, product scope and team section; no duplicated statement |
| 5. Rework evidence presentation | `projects-section.tsx`, `project-gallery.tsx`, `src/config/projects.ts`, `src/i18n/dictionary.ts`, locale catalogues | All three application deliveries with agency credits and accurate status, extendable case structure, no Auth Flow portfolio entry, appropriate image loading |
| 6. Finish contact and FAQ | `contact-section.tsx`, `contact-channels.tsx`, `contact-form.tsx`, new FAQ wrapper if needed | One coherent enquiry flow, direct email and complete error/success states |
| 7. Apply visual tokens consistently | `globals.css`, `[locale]/layout.tsx`, `siteConfig.themeColor`, manifest and OG helpers | Light colour scheme, removal of permanent `dark` class if following this direction, matching browser chrome and share graphics |
| 8. Remove community coupling | Copy/type fields, contact channels, about section, `[locale]/page.tsx` JSON-LD `sameAs`, unused Discord icon/imports | No community invitation or Discord association remains in rendered content or structured data |
| 9. Retire unused behaviour | Hero video mounting, scroll hint, hero visibility observer and unused helpers | No logo video request on the landing page; physical asset URLs remain stable |
| 10. Verify, document and release | Existing tests, build, browser checks, metadata and documentation | Release criteria below are satisfied; deployment follows the agreed release process |

Keep product copy, accessibility labels and alt text in the typed locale
catalogues. Keep IDs, URLs, asset dimensions and visibility/configuration in
`src/config`. Preserve Server Components for static content and use small
client islands for the form, mobile menu, FAQ and any interactive gallery.
Do not hand-edit generated `src/components/ui` files; customise through tokens
and feature wrappers or regenerate a required primitive.

Refactor the first gallery's current image priority policy: the hero's actual
largest content image deserves intentional loading, while below-fold project
media should not compete for it. Consult the installed Image documentation
before choosing preload/loading props.

Update title, description, Open Graph text/image, manifest copy and structured
data to match the new positioning. Keep metadata routes, `src/proxy.ts`,
canonical and language routing conventions intact. For future case pages,
use their own canonical/alternate metadata and add only real routes to the
sitemap. Describe the agency brand consistently while keeping any legal
operator details accurate.

### Scope and sequencing

**First release:** seven-section landing page, Czech and English, existing
contact delivery, all three application summaries with agency attribution,
free introductory consultation, a clear explanation of paid work, refreshed
presentation, relevant privacy information and updated metadata. Additional
application projects use the same structure as their materials become available.

**Following release:** dedicated case studies, a fuller discovery page,
additional client testimony, a booking option, and richer product demos when
they have real supporting content.

**Separate work:** application redesigns, a community site, full visual brand
redesign, paid acquisition and long-form content marketing.

Working effort estimate after core content is available: about 1–2 focused
days for content/wireframes, 1–2 for the visual direction, 2–4 for implementation,
and 1–2 for verification and polish. This is a rough planning range of 5–10
working days, not a fixed bid or elapsed-time commitment. New screenshots,
case-study interviews, owner review and separate pages can extend it.

## 10. Acceptance and measurement

### Before implementation

Use the wireframe with roughly 3–5 people who resemble prospective customers.
Ask what the studio does, whom it helps, whether a finished brief is needed,
and what they expect after clicking the contact action. This is qualitative
feedback, not statistical proof. Revise unclear copy before adding visual
complexity.

### Before release

- Navigation, headline and primary CTA work immediately, including before
  optional enhancements load.
- The page explains mobile delivery and a sensible first step without relying
  on the visitor understanding discovery or MVP terminology.
- Every case distinguishes delivered work, current development and concepts.
- All three application projects are present with Smolikja as the supplier;
  Flutter Auth Flow is absent from the portfolio in both languages.
- Agency copy consistently uses first-person plural. There is no founder-led
  singular narrative, invented team size or unsupported continuity promise.
- Free introductory consultation and paid research/design are distinguished;
  no universal price or unlimited free workshop has been introduced.
- Discord and community recruitment are absent in both locales and metadata.
- Validate 360/390px mobile, tablet and desktop layouts, then 320 CSS-pixel
  reflow, zoom, keyboard operation and reduced-motion behaviour.
- Check Safari/iOS and Chrome/Android, with an opaque header fallback and
  visible focus. The header must not cover anchor targets or form feedback.
- Verify the form's server validation, pending/success/error states and retry
  behaviour with controlled test delivery; do not send unrequested mail during
  the design research phase.
- Run `pnpm check` and `pnpm build` for the application implementation, and
  browser verification against a running app. Keep unit tests focused on
  changed behaviour and localisation contracts; screenshots/spacing need visual
  review rather than implementation-mirroring tests.
- Verify image sizes, loading, layout stability, locale metadata and existing
  asset URLs. Use production performance checks and establish field monitoring
  when there is sufficient traffic.

### After release

Primary business measure: number of qualified enquiries and conversations that
become suitable paid engagements. Define qualification with the owner using
need, decision maker, feasible scope and commercial fit.

Optional funnel events: primary CTA click with section location, project view,
form start and successful enquiry. An email click or CTA click is not a lead,
and a submitted message is not automatically qualified. Use aggregate counts
and the owner's actual sales follow-up together. Do not include form contents
or personal contact details in analytics events. Select the analytics tool and
its deployment/privacy configuration during implementation if tracking is wanted.

Review after roughly 4–6 weeks or when enough enquiries have accumulated to
learn from them. At low volume, use customer conversations rather than declaring
a numerical uplift or running underpowered A/B tests. No conversion-rate
increase is promised by this plan.

## 11. Remaining implementation inputs

The owner has confirmed team presentation, agency attribution for every
application, inclusion of all current apps, removal of Auth Flow and a free
introduction followed by paid analytical/design work. These are settled
directions and should not be reopened as prerequisites.

For final public copy and commercial calibration, collect:

1. Exact delivery scope, current release status, publishable operator/brand
   attribution and available outcomes for each application; materials for new
   portfolio projects as they are added.
2. Actual hours and costs behind the historical CZK 50,000 engagement, and
   subsequent scoped quotes, to validate the internal pricing model. Two elapsed
   weeks do not establish the actual hours worked or project profit.
3. The usual free-consultation allowance and which continuity practices can
   already be described publicly. Longer free on-site meetings remain an
   individual commercial choice.

Before launch, supply publishable business operator details, usable privacy
information and an operational team contact address. A real team image is
optional. A domain email can support the brand if it is actually configured;
do not replace the current working address with an invented one.

The proposed pricing ranges are internal planning guidance. They do not become
public offers until scope, delivery capacity and profitability have been checked.
