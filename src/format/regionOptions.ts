import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import type { SelectOption } from '../components/SearchableSelect/SearchableSelect.types';

countries.registerLocale(enLocale);

/** Every country in the reader's language, value being the upper-case ISO code. */
export function listCountryOptions(locale: string): SelectOption[] {
  const english = countries.getNames('en', { select: 'official' });
  let names: Intl.DisplayNames | null = null;

  try {
    names = new Intl.DisplayNames([locale], { type: 'region' });
  } catch {
    names = null;
  }

  return Object.keys(countries.getAlpha2Codes())
    .map((code) => ({
      value: code,
      label: names?.of(code) ?? english[code] ?? code,
      keywords: english[code],
    }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
}

function timeZoneNames(): string[] {
  try {
    const intl = Intl as unknown as {
      supportedValuesOf?: (key: string) => string[];
    };

    return intl.supportedValuesOf?.('timeZone') ?? [];
  } catch {
    return [];
  }
}

/** "GMT+1" for a zone at this moment, or null if the browser can't say. */
export function timeZoneOffsetLabel(timeZone: string, at: Date): string | null {
  try {
    return (
      new Intl.DateTimeFormat('en', { timeZone, timeZoneName: 'shortOffset' })
        .formatToParts(at)
        .find((part) => part.type === 'timeZoneName')?.value ?? null
    );
  } catch {
    return null;
  }
}

/** "Lagos" with its region and current offset, value being the IANA name. */
export function listTimeZoneOptions(at: Date = new Date()): SelectOption[] {
  return timeZoneNames().map((zone) => {
    const parts = zone.split('/');
    const city = parts[parts.length - 1].replace(/_/g, ' ');
    const offset = timeZoneOffsetLabel(zone, at);

    return {
      value: zone,
      label: city,
      hint: [parts[0], offset].filter(Boolean).join(' · '),
      selectedLabel: offset ? `${city} (${offset})` : city,
      keywords: zone,
    };
  });
}
