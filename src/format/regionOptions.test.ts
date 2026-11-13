import { describe, expect, it } from 'vitest';

import {
  listCountryOptions,
  listTimeZoneOptions,
  timeZoneOffsetLabel,
} from './regionOptions';

describe('listCountryOptions', () => {
  it('names countries in the reader language and keeps English searchable', () => {
    const germany = listCountryOptions('fr').find((c) => c.value === 'DE');

    expect(germany?.label).toBe('Allemagne');
    expect(germany?.keywords).toBe('Germany');
  });

  it('is sorted by name', () => {
    const labels = listCountryOptions('en').map((c) => c.label);

    expect(labels).toEqual(
      [...labels].sort((a, b) => a.localeCompare(b, 'en')),
    );
  });
});

describe('time zones', () => {
  const at = new Date('2026-01-15T12:00:00Z');

  it('gives a zone its offset', () => {
    expect(timeZoneOffsetLabel('Africa/Lagos', at)).toBe('GMT+1');
  });

  it('labels a zone by its city and keeps the full name searchable', () => {
    const lagos = listTimeZoneOptions(at).find(
      (zone) => zone.value === 'Africa/Lagos',
    );

    expect(lagos?.label).toBe('Lagos');
    expect(lagos?.selectedLabel).toBe('Lagos (GMT+1)');
    expect(lagos?.keywords).toBe('Africa/Lagos');
  });
});
