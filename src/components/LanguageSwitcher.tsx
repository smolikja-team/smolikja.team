'use client';

import type { Language } from '@/types';
import { useLanguage } from '@/components/providers/LanguageProvider';

type LanguageSwitcherProps = {
  className?: string;
  isActive?: boolean;
};

type SwitcherCopy = {
  button: string;
  aria: string;
};

const COPY: Record<Language, SwitcherCopy> = {
  cs: {
    button: 'EN',
    aria: 'Přepnout web do angličtiny',
  },
  en: {
    button: 'CS',
    aria: 'Switch site to Czech',
  },
};

export default function LanguageSwitcher({ className, isActive }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();
  const copy = COPY[language];
  const classes = ['language-switcher', className];

  if (isActive) {
    classes.push('language-switcher--visible');
  }

  const classNameValue = classes.filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNameValue}
      onClick={toggleLanguage}
      aria-label={copy.aria}
    >
      {copy.button}
    </button>
  );
}
