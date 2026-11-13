/**
 * The languages the app ships catalogs for. Adding one means adding a catalog
 * under `catalogs/` and an entry here; nothing else keys off the code.
 */
export const SUPPORTED_LANGUAGES = [
  'en',
  'fr',
  'es',
  'de',
  'ar',
  'tr',
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type TextDirection = 'ltr' | 'rtl';

export const DEFAULT_LANGUAGE: Language = 'en';

/** Written in their own language so a reader can find theirs. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
  tr: 'Türkçe',
};

const RTL_LANGUAGES: ReadonlySet<string> = new Set(['ar', 'he', 'fa', 'ur']);

export function directionOf(language: string): TextDirection {
  return RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
}

export function isSupportedLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
  );
}

/**
 * Maps a BCP 47 tag (`fr-CA`, `ar_EG`, `EN`) to a language we ship, or null
 * when we have none for it.
 */
export function languageFromLocale(
  locale: string | null | undefined,
): Language | null {
  if (!locale) return null;

  const base = locale.trim().toLowerCase().split(/[-_]/)[0];

  return isSupportedLanguage(base) ? base : null;
}
