import { describe, expect, it } from 'vitest';

import { CATALOGUES, UI_LANGUAGES } from './catalogues';
import { en } from './en';
import { placeholdersOf } from './interpolate';

const englishKeys = Object.keys(en).sort();

describe('package catalogues', () => {
  it('every key starts with ui.', () => {
    for (const key of englishKeys) expect(key.startsWith('ui.')).toBe(true);
  });

  for (const language of UI_LANGUAGES.filter((l) => l !== 'en')) {
    describe(language, () => {
      const catalogue = CATALOGUES[language] as Record<string, string>;

      it('has every English key and no others', () => {
        expect(Object.keys(catalogue).sort()).toEqual(englishKeys);
      });

      it('keeps the same placeholders as English', () => {
        for (const key of englishKeys) {
          expect(placeholdersOf(catalogue[key] ?? ''), key).toEqual(
            placeholdersOf((en as Record<string, string>)[key]),
          );
        }
      });

      it('has no empty strings', () => {
        for (const [key, value] of Object.entries(catalogue)) {
          expect(value.trim(), key).not.toBe('');
        }
      });
    });
  }
});
