/**
 * Calendar arithmetic on plain `YYYY-MM-DD` and `YYYY-MM` strings. Dates are
 * days at a school, not moments, so nothing here touches the browser's zone.
 */

const pad = (value: number) => String(value).padStart(2, '0');

export const toIsoDay = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

export const toIsoMonth = (year: number, month: number) =>
  `${year}-${pad(month + 1)}`;

export function parseIsoDay(iso: string) {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(iso);

  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3] ?? 1),
  };
}

export function shiftMonth(year: number, month: number, by: number) {
  const moved = new Date(Date.UTC(year, month + by, 1));

  return { year: moved.getUTCFullYear(), month: moved.getUTCMonth() };
}

/** The locale's first day of the week: 0 Sunday to 6 Saturday. Monday if unknown. */
export function firstDayOfWeek(locale: string): number {
  try {
    const info = new Intl.Locale(locale) as Intl.Locale & {
      weekInfo?: { firstDay: number };
      getWeekInfo?: () => { firstDay: number };
    };
    const firstDay = (info.getWeekInfo?.() ?? info.weekInfo)?.firstDay;

    return firstDay === undefined ? 1 : firstDay % 7;
  } catch {
    return 1;
  }
}

/** One month as rows of seven: ISO days, with null for the blanks around it. */
export function monthCells(
  year: number,
  month: number,
  weekStart: number,
): (string | null)[] {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const blanks = (firstWeekday - weekStart + 7) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  return [
    ...Array.from({ length: blanks }, () => null),
    ...Array.from({ length: days }, (_, i) => toIsoDay(year, month, i + 1)),
  ];
}

function utcFormat(
  iso: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) {
  const parts = parseIsoDay(iso);

  if (!parts) return '';

  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: 'UTC',
  }).format(Date.UTC(parts.year, parts.month, parts.day));
}

/** "9 Nov 2026" in the reader's way of writing dates. */
export const formatIsoDay = (iso: string, locale: string) =>
  utcFormat(iso, locale, { day: 'numeric', month: 'short', year: 'numeric' });

/** "Monday 9 November 2026", for screen readers. */
export const formatIsoDayLong = (iso: string, locale: string) =>
  utcFormat(iso, locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** "Monday, 9 November", for a day the reader knows the year of. */
export const formatIsoDayName = (iso: string, locale: string) =>
  utcFormat(iso, locale, { weekday: 'long', day: 'numeric', month: 'long' });

/** "9 Nov". */
export const formatIsoDayShort = (iso: string, locale: string) =>
  utcFormat(iso, locale, { day: 'numeric', month: 'short' });

/** "November 2026". */
export const formatIsoMonth = (iso: string, locale: string) =>
  utcFormat(iso, locale, { month: 'long', year: 'numeric' });

/** Twelve short month names, January first. */
export const shortMonthNames = (locale: string) =>
  Array.from({ length: 12 }, (_, month) =>
    utcFormat(toIsoMonth(2024, month), locale, { month: 'short' }),
  );

/** Twelve full month names, January first. */
export const longMonthNames = (locale: string) =>
  Array.from({ length: 12 }, (_, month) =>
    utcFormat(toIsoMonth(2024, month), locale, { month: 'long' }),
  );

/** Seven short weekday names, starting from `weekStart`. */
export const shortWeekdayNames = (locale: string, weekStart: number) =>
  Array.from({ length: 7 }, (_, i) =>
    // 7 January 2024 was a Sunday.
    utcFormat(toIsoDay(2024, 0, 7 + ((weekStart + i) % 7)), locale, {
      weekday: 'short',
    }),
  );

/** The written day of the month, in the reader's numerals. */
export const formatDayNumber = (iso: string, locale: string) =>
  utcFormat(iso, locale, { day: 'numeric' });

/** A year in the reader's numerals, without a thousands separator. */
export const formatYear = (year: number, locale: string) =>
  new Intl.NumberFormat(locale, { useGrouping: false }).format(year);
