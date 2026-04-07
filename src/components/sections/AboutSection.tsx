'use client';

import { ReactElement } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatMessage } from '@/lib/i18n';
import type { Language, LocalizedString } from '@/types';

type SocialLink = {
  href: string;
  label: LocalizedString;
  icon: ReactElement;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'mailto:smolikja@protonmail.com',
    label: {
      cs: 'E-mail',
      en: 'Email',
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/smolikja-team/',
    label: {
      cs: 'GitHub',
      en: 'GitHub',
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://discord.gg/jrnAaFeEzu',
    label: {
      cs: 'Discord',
      en: 'Discord',
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  },
];

type AboutCopy = {
  kicker: string;
  heading: string;
  intro: string;
  paragraphs: string[];
  focusTitle: string;
  focusItems: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  footerBeforeLink: string;
  footerAfterLink: string;
  footerLinkLabel: string;
  socialLabel: string;
  socialAriaLabel: string;
};

const ABOUT_COPY: Record<Language, AboutCopy> = {
  cs: {
    kicker: 'Kontakt',
    heading: 'Hodíme se tam, kde mobilní produkt potřebuje vlastnictví, ne jen další pár rukou.',
    intro:
      'Stavíme aplikace od nuly, přebíráme odpovědnost za UX i delivery a dokážeme dlouhodobě držet technický i produktový kontext.',
    paragraphs: [
      'Řídíme celý cyklus od strategie a product discovery přes výzkum, UX a vizuální návrh, technickou architekturu, implementaci, marketing i uvedení na trh.',
      'Pro vývojová prostředí provozujeme vlastní servery a produkci kombinujeme s cloudovou infrastrukturou, aby aplikace šly bezpečně škálovat, monitorovat a dál rozvíjet.',
    ],
    focusTitle: 'Typické situace, kde dáváme největší smysl',
    focusItems: [
      'Greenfield mobilní produkt s nejasně definovaným MVP',
      'Klientská nebo provozní aplikace, kde UX rozhoduje o rychlosti práce',
      'Tým, který potřebuje spojit produkt, design a technickou realizaci',
    ],
    ctaTitle: 'Pojďme to probrat',
    ctaDescription:
      'Pokud řešíte nový mobilní produkt, redesign existující aplikace nebo hledáte partnera pro dlouhodobý rozvoj, napište nám nebo se přidejte do komunity.',
    ctaPrimary: 'Napsat e-mail',
    ctaSecondary: 'Přidat se na Discord',
    footerBeforeLink: 'Osobně nás najdete ve',
    footerAfterLink:
      ', kreativním a technologickém prostoru na Smíchově, kde máme zázemí i místo pro společná setkání.',
    footerLinkLabel: 'SKLADu',
    socialLabel: 'Další místa, kde nás najdete',
    socialAriaLabel: 'Otevřít {{label}} smolikja team',
  },
  en: {
    kicker: 'Contact',
    heading: 'Best fit for teams that need product ownership, not just extra implementation capacity.',
    intro:
      'We build mobile products from scratch, take responsibility for UX and delivery, and keep the technical and product context intact over time.',
    paragraphs: [
      'The scope covers strategy and product discovery, research, UX, visual design, architecture, implementation, marketing, and launch.',
      'We run our own development environments and combine production with cloud infrastructure so products can scale safely, be monitored properly, and keep evolving.',
    ],
    focusTitle: 'Typical situations where we fit best',
    focusItems: [
      'A greenfield mobile product with an MVP that still needs shaping',
      'A client or operational app where UX directly affects speed and reliability',
      'A team that needs product, design, and engineering to work as one system',
    ],
    ctaTitle: 'Start the conversation',
    ctaDescription:
      'If you are planning a new mobile product, redesigning an existing app, or looking for a long-term delivery partner, reach out directly or join the community.',
    ctaPrimary: 'Send an email',
    ctaSecondary: 'Join Discord',
    footerBeforeLink: 'You can also meet us at',
    footerAfterLink:
      ', a creative and technology space in Smíchov where we have our base and room for in-person meetups.',
    footerLinkLabel: 'SKLAD',
    socialLabel: 'Other places to reach us',
    socialAriaLabel: "Open smolikja team's {{label}}",
  },
};

export default function AboutSection() {
  const { language } = useLanguage();
  const copy = ABOUT_COPY[language];

  return (
    <section id="about" className="section section-about">
      <div className="content-wrapper">
        <div className="section-heading">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 className="section-title">{copy.heading}</h2>
          <p className="section-lead">{copy.intro}</p>
        </div>

        <div className="about-layout">
          <div className="about-main">
            <div className="about-main__body">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-description">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-focus">
              <h3 className="about-focus__title">{copy.focusTitle}</h3>
              <ul className="about-focus__list">
                {copy.focusItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="about-rail">
            <div className="about-cta">
              <h3 className="about-cta__title">{copy.ctaTitle}</h3>
              <p className="about-cta__description">{copy.ctaDescription}</p>

              <div className="about-cta__actions">
                <a href="mailto:smolikja@protonmail.com" className="button button--primary">
                  {copy.ctaPrimary}
                </a>
                <a
                  href="https://discord.gg/jrnAaFeEzu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--secondary"
                >
                  {copy.ctaSecondary}
                </a>
              </div>

              <p className="about-cta__footer">
                {copy.footerBeforeLink}{' '}
                <a
                  href="https://sklad.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-inline-link"
                >
                  {copy.footerLinkLabel}
                </a>
                {copy.footerAfterLink}
              </p>
            </div>

            <div className="about-social">
              <p className="about-social__label">{copy.socialLabel}</p>
              <div className="social-links">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={formatMessage(copy.socialAriaLabel, {
                      label: link.label[language],
                    })}
                  >
                    <span className="social-link__icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    <span className="social-link__label">{link.label[language]}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
