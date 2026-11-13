import { describe, expect, it } from 'vitest';

import {
  clockTimes,
  formatClockTime,
  parseTypedTime,
} from './timeOptions';

describe('parseTypedTime', () => {
  it.each([
    ['14:30', '14:30'],
    ['9:05', '09:05'],
    ['930', '09:30'],
    ['1430', '14:30'],
    ['2pm', '14:00'],
    ['2.30 pm', '14:30'],
    ['12am', '00:00'],
    ['12pm', '12:00'],
    ['7', '07:00'],
  ])('reads %s', (typed, wanted) => {
    expect(parseTypedTime(typed)).toBe(wanted);
  });

  it.each(['25:00', '12:75', '13pm', 'soon', ''])('rejects %s', (typed) => {
    expect(parseTypedTime(typed)).toBeNull();
  });
});

describe('clockTimes', () => {
  it('covers the day at the step', () => {
    const times = clockTimes(30);

    expect(times).toHaveLength(48);
    expect(times[1]).toBe('00:30');
    expect(times[47]).toBe('23:30');
  });
});

describe('formatClockTime', () => {
  it('writes the time the reader’s way', () => {
    expect(formatClockTime('14:30', 'en-GB')).toBe('14:30');
    expect(formatClockTime('14:30', 'en-US')).toMatch(/2:30\sPM/);
  });

  it('leaves anything else alone', () => {
    expect(formatClockTime('later', 'en-GB')).toBe('later');
  });
});
