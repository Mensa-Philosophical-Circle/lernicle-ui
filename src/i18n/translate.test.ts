import { describe, expect, it } from 'vitest';

import { translateUI } from './translate';

const english = { 'ui.close': 'Close', 'ui.rows': '{{from}} to {{to}}' };
const french = { 'ui.close': 'Fermer' };

describe('translateUI', () => {
  it('uses the language catalogue first', () => {
    expect(translateUI('ui.close', undefined, french, english)).toBe('Fermer');
  });

  it('falls back to English, then to the key', () => {
    expect(translateUI('ui.rows', { from: 1, to: 20 }, french, english)).toBe('1 to 20');
    expect(translateUI('ui.unknown', undefined, french, english)).toBe('ui.unknown');
  });

  it('lets the app override a string', () => {
    const override = (key: string) => (key === 'ui.close' ? 'Done' : undefined);

    expect(translateUI('ui.close', undefined, french, english, override)).toBe('Done');
    expect(translateUI('ui.rows', { from: 2, to: 3 }, french, english, override)).toBe('2 to 3');
  });
});
