'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_LANGUAGE, detectBrowserLanguage, isSupportedLanguage } from '@/lib/i18n';
import type { Language } from '@/types';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'smolikja.language';

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (isSupportedLanguage(storedValue)) {
      setLanguage(storedValue);
      return;
    }

    const detected = detectBrowserLanguage();
    if (detected !== DEFAULT_LANGUAGE) {
      setLanguage(detected);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const handleSetLanguage = useCallback((value: Language) => {
    setLanguage(value);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((previous) => (previous === 'cs' ? 'en' : 'cs'));
  }, []);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      toggleLanguage,
    }),
    [handleSetLanguage, language, toggleLanguage],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
