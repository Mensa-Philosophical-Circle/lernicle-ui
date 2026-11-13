import { describe, expect, it } from 'vitest';

import { CATALOGUES, UI_LANGUAGES } from './catalogues';
import { en } from './en';
import { placeholdersOf } from './interpolate';

// The same rules as the apps' catalogue test, plus: every language has every
// English key, since the package's wording is small and has no other fallback
// than English.
const PLURAL = /_(zero|one|two|few|many|other)$/;
const source = en as Record<string, string>;
const englishKeys = Object.keys(source).sort();

describe('English catalogue', () => {
  it('has only ui.* keys and no markup', () => {
    expect(englishKeys.filter((key) => !key.startsWith('ui.'))).toEqual([]);
    expect(Object.values(source).filter((text) => /<[a-z/][^>]*>/i.test(text))).toEqual([]);
  });
});

describe.each(UI_LANGUAGES.filter((l) => l !== 'en'))('%s catalogue', (language) => {
  const catalogue = CATALOGUES[language];
  const entries = Object.entries(catalogue);

  it('has every English key', () => {
    expect(englishKeys.filter((key) => !(key in catalogue))).toEqual([]);
  });

  it('only has keys that exist in English, or another plural form of one', () => {
    const unknown = entries
      .map(([key]) => key)
      .filter(
        (key) =>
          !(key in source) &&
          !(PLURAL.test(key) && `${key.replace(PLURAL, '')}_other` in source),
      );

    expect(unknown).toEqual([]);
  });

  it('keeps the placeholders of the English string', () => {
    const mismatched = entries.filter(([key, text]) => {
      const reference = source[key] ?? source[`${key.replace(PLURAL, '')}_other`];
      const wanted = placeholdersOf(reference);
      const found = placeholdersOf(text);

      // Plural forms may drop {{count}} ("one day"), but add nothing new.
      return PLURAL.test(key)
        ? found.some((name) => !wanted.includes(name))
        : wanted.join() !== found.join();
    });

    expect(mismatched.map(([key]) => key)).toEqual([]);
  });

  it('has no empty strings and no markup', () => {
    expect(entries.filter(([, text]) => !text.trim() || /<[a-z/][^>]*>/i.test(text))).toEqual([]);
  });
});
