'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import type { Language } from '@/types';

type CapabilityItem = {
  eyebrow: string;
  title: string;
  description: string;
};

type ProcessItem = {
  step: string;
  title: string;
  description: string;
};

type CapabilitiesCopy = {
  kicker: string;
  heading: string;
  lead: string;
  capabilityItems: CapabilityItem[];
  processKicker: string;
  processHeading: string;
  processLead: string;
  processItems: ProcessItem[];
  stackKicker: string;
  stackHeading: string;
  stackDescription: string;
  stackItems: string[];
};

const CAPABILITIES_COPY: Record<Language, CapabilitiesCopy> = {
  cs: {
    kicker: 'Jak pracujeme',
    heading: 'End-to-end tým pro mobilní produkty, kde se musí potkat UX, technologie i provozní realita.',
    lead:
      'Pokrýváme produktové zadání, návrh rozhraní, technickou architekturu i dlouhodobé doručování. To je důležité hlavně u aplikací, které neslouží jen jako marketingová vrstva, ale mají skutečně nést provoz.',
    capabilityItems: [
      {
        eyebrow: 'Discovery',
        title: 'Produktový rámec ještě před první obrazovkou',
        description:
          'Pomáháme ujasnit cíle, provozní kontext i priority MVP, aby mobilní aplikace nezačínala jen seznamem funkcí.',
      },
      {
        eyebrow: 'UX',
        title: 'Rozhraní pro skutečné používání v terénu',
        description:
          'Navrhujeme aplikace pro jednoruké ovládání, rychlé rozhodování i stresové provozní situace, ne jen pro statické mockupy.',
      },
      {
        eyebrow: 'Delivery',
        title: 'Native i Flutter podle produktu, ne podle módy',
        description:
          'Volíme technologii podle požadavků aplikace a držíme celý delivery proces od architektury po release pod jednou střechou.',
      },
      {
        eyebrow: 'Operations',
        title: 'Nasazení, monitoring a dlouhodobá péče',
        description:
          'Po vydání řešíme i infrastrukturu, provozní dohled, iterace a další rozvoj, aby produkt nezůstal jen jednorázovým buildem.',
      },
    ],
    processKicker: 'Operating model',
    processHeading: 'Proces rozdělený do tří jasných rozhodovacích kroků.',
    processLead:
      'Stejný tým drží produktový kontext od prvního rámování až po release a další iterace. Díky tomu se méně ztrácí záměr a rychleji se rozhoduje.',
    processItems: [
      {
        step: '01',
        title: 'Align',
        description:
          'Sjednotíme cíl produktu, rizika a provozní omezení ještě před návrhem řešení.',
      },
      {
        step: '02',
        title: 'Design & build',
        description:
          'Propojíme UX, vizuální směr a technickou architekturu do jednoho delivery proudu.',
      },
      {
        step: '03',
        title: 'Ship & refine',
        description:
          'Po release navazujeme měřením, supportem a dalšími iteracemi podle reálného používání.',
      },
    ],
    stackKicker: 'Stack & focus',
    stackHeading: 'Produktové myšlení podpořené konkrétním delivery stackem.',
    stackDescription:
      'Podle typu produktu volíme native nebo Flutter, ale cíl zůstává stejný: rychlý a stabilní delivery systém od UX po infrastrukturu.',
    stackItems: [
      'iOS',
      'Android',
      'Flutter',
      'TypeScript',
      'WebSocket',
      'Product discovery',
      'Design systems',
      'Cloud delivery',
    ],
  },
  en: {
    kicker: 'How we work',
    heading: 'An end-to-end mobile product team where UX, engineering, and operating reality stay aligned.',
    lead:
      'The work covers product framing, interface design, technical architecture, and long-term delivery. That matters most for apps that carry real operational responsibility instead of serving as surface-level marketing shells.',
    capabilityItems: [
      {
        eyebrow: 'Discovery',
        title: 'Product framing before the first screen exists',
        description:
          'We help shape goals, operating context, and MVP priorities so the mobile app does not start as a disconnected feature list.',
      },
      {
        eyebrow: 'UX',
        title: 'Interfaces designed for real-world use',
        description:
          'The focus is on one-handed flows, fast decision-making, and operational situations rather than static portfolio mockups.',
      },
      {
        eyebrow: 'Delivery',
        title: 'Native and Flutter chosen by product fit',
        description:
          'The stack follows the product constraints, while architecture, implementation, and release stay within the same delivery system.',
      },
      {
        eyebrow: 'Operations',
        title: 'Launch, monitoring, and long-term care',
        description:
          'The work continues after release with infrastructure, runtime oversight, and iterations based on actual product use.',
      },
    ],
    processKicker: 'Operating model',
    processHeading: 'A delivery model split into three clear decision stages.',
    processLead:
      'The same team carries product context from framing through release and iteration. That reduces handoff loss and keeps decision-making faster and more coherent.',
    processItems: [
      {
        step: '01',
        title: 'Align',
        description:
          'We align the product goal, risks, and operating constraints before solution design begins.',
      },
      {
        step: '02',
        title: 'Design & build',
        description:
          'UX, visual direction, and technical architecture move together instead of in isolated handoffs.',
      },
      {
        step: '03',
        title: 'Ship & refine',
        description:
          'Release is followed by measurement, support, and iteration based on actual usage.',
      },
    ],
    stackKicker: 'Stack & focus',
    stackHeading: 'Product thinking backed by a concrete delivery stack.',
    stackDescription:
      'Native and Flutter are chosen by product fit, but the outcome stays the same: a fast, stable delivery system spanning UX, engineering, and infrastructure.',
    stackItems: [
      'iOS',
      'Android',
      'Flutter',
      'TypeScript',
      'WebSocket',
      'Product discovery',
      'Design systems',
      'Cloud delivery',
    ],
  },
};

export default function CapabilitiesSection() {
  const { language } = useLanguage();
  const copy = CAPABILITIES_COPY[language];

  return (
    <section id="capabilities" className="section section-capabilities">
      <div className="content-wrapper">
        <div className="section-heading">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 className="section-title">{copy.heading}</h2>
          <p className="section-lead">{copy.lead}</p>
        </div>

        <div className="capability-list">
          {copy.capabilityItems.map((item, index) => (
            <div key={item.title} className="capability-row">
              <span className="capability-row__index">{String(index + 1).padStart(2, '0')}</span>
              <div className="capability-row__body">
                <p className="capability-card__eyebrow">{item.eyebrow}</p>
                <h3 className="capability-card__title">{item.title}</h3>
                <p className="capability-card__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="capabilities-lower">
          <div className="process-panel">
            <div className="process-panel__header">
              <p className="section-kicker">{copy.processKicker}</p>
              <h3 className="section-subtitle">{copy.processHeading}</h3>
              <p className="process-panel__lead">{copy.processLead}</p>
            </div>

            <div className="process-stream">
              {copy.processItems.map((item) => (
                <div key={item.step} className="process-step">
                  <span className="process-card__step">{item.step}</span>
                  <div className="process-step__body">
                    <h4 className="process-card__title">{item.title}</h4>
                    <p className="process-card__description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stack-stream">
            <p className="section-kicker">{copy.stackKicker}</p>
            <h3 className="section-subtitle">{copy.stackHeading}</h3>
            <p className="stack-card__description">{copy.stackDescription}</p>

            <div className="stack-card__tags">
              {copy.stackItems.map((item) => (
                <span key={item} className="stack-card__tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
