import { describe, expect, it } from 'vitest';

import {
  firstDayOfWeek,
  formatIsoDay,
  formatIsoMonth,
  monthCells,
  parseIsoDay,
  shiftMonth,
  shortMonthNames,
  shortWeekdayNames,
  toIsoDay,
} from './calendarGrid';

describe('monthCells', () => {
  it('starts on the right weekday for a Monday week', () => {
    // 1 November 2026 is a Sunday: six blanks before it.
    const cells = monthCells(2026, 10, 1);

    expect(cells.slice(0, 6).every((cell) => cell === null)).toBe(true);
    expect(cells[6]).toBe('2026-11-01');
  });

  it('starts on the right weekday for a Sunday week', () => {
    expect(monthCells(2026, 10, 0)[0]).toBe('2026-11-01');
  });

  it('handles a leap February', () => {
    const days = monthCells(2028, 1, 1).filter(Boolean);

    expect(days).toHaveLength(29);
    expect(days[28]).toBe('2028-02-29');
  });
});

describe('date strings', () => {
  it('reads and writes days', () => {
    expect(toIsoDay(2026, 0, 5)).toBe('2026-01-05');
    expect(parseIsoDay('2026-11-09')).toEqual({ year: 2026, month: 10, day: 9 });
    expect(parseIsoDay('2026-11')).toEqual({ year: 2026, month: 10, day: 1 });
    expect(parseIsoDay('nonsense')).toBeNull();
  });

  it('moves between months across a year end', () => {
    expect(shiftMonth(2026, 11, 1)).toEqual({ year: 2027, month: 0 });
    expect(shiftMonth(2026, 0, -1)).toEqual({ year: 2025, month: 11 });
  });

  it('does not slip a day whatever the browser zone', () => {
    expect(formatIsoDay('2026-11-09', 'en-GB')).toBe('9 Nov 2026');
    expect(formatIsoMonth('2026-11', 'en-GB')).toBe('November 2026');
  });
});

describe('names', () => {
  it('gives twelve months', () => {
    expect(shortMonthNames('en-GB')[0]).toBe('Jan');
    expect(shortMonthNames('en-GB')).toHaveLength(12);
  });

  it('starts the week where it is asked to', () => {
    expect(shortWeekdayNames('en-GB', 1)[0]).toBe('Mon');
    expect(shortWeekdayNames('en-GB', 0)[0]).toBe('Sun');
    expect(shortWeekdayNames('en-GB', 6)[6]).toBe('Fri');
  });

  it('falls back to Monday for an unusable locale', () => {
    expect(firstDayOfWeek('not a locale')).toBe(1);
  });

  it('knows a Sunday-first locale', () => {
    expect(firstDayOfWeek('en-US')).toBe(0);
  });
});
