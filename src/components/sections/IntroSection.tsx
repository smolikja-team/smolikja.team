'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { Language } from '@/types';

type IntroCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  navAriaLabel: string;
  navWork: string;
  navCapabilities: string;
  navContact: string;
  proofAriaLabel: string;
  proofItems: Array<{
    label: string;
    value: string;
  }>;
};

const INTRO_COPY: Record<Language, IntroCopy> = {
  cs: {
    eyebrow: 'Pražský tým pro návrh a vývoj mobilních produktů',
    title: 'Navrhujeme a doručujeme mobilní aplikace, které fungují i mimo ideální demo scénáře.',
    description:
      'Strategie, UX, nativní iOS, Android i Flutter delivery pro greenfield produkty, klientské aplikace i provozní rozhraní s vysokou odpovědností.',
    primaryCta: 'Vybrané projekty',
    secondaryCta: 'Začít projekt',
    navAriaLabel: 'Navigace sekcí',
    navWork: 'Projekty',
    navCapabilities: 'Služby',
    navContact: 'Kontakt',
    proofAriaLabel: 'Hlavní důvody důvěry',
    proofItems: [
      {
        label: 'Rozsah',
        value: 'Discovery až launch',
      },
      {
        label: 'Platformy',
        value: 'iOS, Android, Flutter',
      },
      {
        label: 'Model',
        value: 'In-house delivery',
      },
    ],
  },
  en: {
    eyebrow: 'Prague-based team for mobile product design and delivery',
    title: 'We design and ship mobile apps that hold up outside the ideal demo flow.',
    description:
      'Strategy, UX, native iOS, Android, and Flutter delivery for greenfield products, client apps, and high-responsibility operational interfaces.',
    primaryCta: 'Selected work',
    secondaryCta: 'Start a project',
    navAriaLabel: 'Section navigation',
    navWork: 'Work',
    navCapabilities: 'Capabilities',
    navContact: 'Contact',
    proofAriaLabel: 'Primary proof points',
    proofItems: [
      {
        label: 'Coverage',
        value: 'Discovery to launch',
      },
      {
        label: 'Platforms',
        value: 'iOS, Android, Flutter',
      },
      {
        label: 'Model',
        value: 'In-house delivery',
      },
    ],
  },
};

export default function IntroSection() {
  const { language } = useLanguage();
  const copy = INTRO_COPY[language];

  return (
    <section id="top" className="section section-intro">
      <div className="content-wrapper intro-overlay">
        <div className="intro-topbar">
          <div className="intro-topbar__actions">
            <nav className="intro-nav" aria-label={copy.navAriaLabel}>
              <a href="#projects">{copy.navWork}</a>
              <a href="#capabilities">{copy.navCapabilities}</a>
              <a href="#about">{copy.navContact}</a>
            </nav>

            <LanguageSwitcher className="language-switcher--hero" isActive />
          </div>
        </div>

        <div className="intro-body">
          <p className="intro-eyebrow">{copy.eyebrow}</p>
          <h1 className="intro-title">{copy.title}</h1>
          <p className="intro-description">{copy.description}</p>

          <div className="intro-actions">
            <a href="#projects" className="button button--primary">
              {copy.primaryCta}
            </a>
            <a href="mailto:smolikja@protonmail.com" className="button button--secondary">
              {copy.secondaryCta}
            </a>
          </div>

          <ul className="intro-proof-list" aria-label={copy.proofAriaLabel}>
            {copy.proofItems.map((item) => (
              <li key={item.label} className="intro-proof-item">
                <span className="intro-proof-item__label">{item.label}</span>
                <strong className="intro-proof-item__value">{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
