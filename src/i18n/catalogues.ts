import { ar } from './ar';
import { de } from './de';
import { en, type UICatalogue } from './en';
import { es } from './es';
import { fr } from './fr';
import { tr } from './tr';

export const UI_LANGUAGES = ['en', 'fr', 'es', 'de', 'ar', 'tr'] as const;
export type UILanguage = (typeof UI_LANGUAGES)[number];

export const CATALOGUES: Record<UILanguage, UICatalogue> = {
  en,
  fr,
  es,
  de,
  ar,
  tr,
};
