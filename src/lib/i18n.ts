import type { Language } from '@/types';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['cs', 'en'] as const;

export const DEFAULT_LANGUAGE: Language = 'cs';

export const isSupportedLanguage = (value: string | null | undefined): value is Language =>
  typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as Language);

export const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const userLanguage = navigator.language?.toLowerCase() ?? '';
  if (userLanguage.startsWith('en')) {
    return 'en';
  }

  if (userLanguage.startsWith('cs')) {
    return 'cs';
  }

  return DEFAULT_LANGUAGE;
};

export const formatMessage = (
  template: string,
  variables: Record<string, string | number> = {},
): string =>
  Object.entries(variables).reduce(
    (message, [key, value]) => message.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
