import { describe, expect, it } from 'vitest';

import { schoolDay, wallClock } from './schoolDay';

describe('schoolDay', () => {
  it("is the date in the school's timezone", () => {
    const now = new Date('2026-11-09T23:30:00Z');

    expect(schoolDay(now, 'Africa/Lagos')).toBe('2026-11-10');
    expect(schoolDay(now, 'UTC')).toBe('2026-11-09');
  });
});

describe('wallClock', () => {
  it("reads the date and time on a time zone's clock", () => {
    const instant = Date.parse('2026-11-09T23:30:00Z');

    expect(wallClock(instant, 'Africa/Lagos')).toEqual({
      y: 2026,
      m: 11,
      d: 10,
      h: 0,
      min: 30,
    });
  });
});
