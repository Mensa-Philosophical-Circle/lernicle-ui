import { describe, expect, it } from 'vitest';

import { translateUI } from './translate';

const english = {
  'ui.close': 'Close',
  'ui.rows': '{{from}} to {{to}}',
  'ui.added_one': 'One row added.',
  'ui.added_other': '{{count}} rows added.',
};
const french = { 'ui.close': 'Fermer' };
const arabic = {
  'ui.added_one': 'صف واحد',
  'ui.added_two': 'صفان',
  'ui.added_other': '{{count}} صفوف',
};

describe('translateUI', () => {
  it('uses the language catalogue first', () => {
    expect(translateUI('fr', 'ui.close', undefined, french, english)).toBe('Fermer');
  });

  it('falls back to English, then to the key', () => {
    expect(translateUI('fr', 'ui.rows', { from: 1, to: 20 }, french, english)).toBe('1 to 20');
    expect(translateUI('fr', 'ui.unknown', undefined, french, english)).toBe('ui.unknown');
  });

  it('picks the plural form for the count, in the language', () => {
    expect(translateUI('en', 'ui.added', { count: 1 }, english, english)).toBe('One row added.');
    expect(translateUI('en', 'ui.added', { count: 3 }, english, english)).toBe('3 rows added.');
    expect(translateUI('ar', 'ui.added', { count: 2 }, arabic, english)).toBe('صفان');
    expect(translateUI('ar', 'ui.added', { count: 11 }, arabic, english)).toBe('11 صفوف');
  });

  it('lets the app override a string', () => {
    const override = (key: string) => (key === 'ui.close' ? 'Done' : undefined);

    expect(translateUI('fr', 'ui.close', undefined, french, english, override)).toBe('Done');
    expect(translateUI('fr', 'ui.rows', { from: 2, to: 3 }, french, english, override)).toBe('2 to 3');
  });
});
