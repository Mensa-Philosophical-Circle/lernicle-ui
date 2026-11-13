import { describe, expect, it } from 'vitest';

import {
  currencyDigits,
  monthYearTitle,
  weekdayName,
} from './payWords';

describe('payWords', () => {
  it('reads each currency’s real decimals', () => {
    expect(currencyDigits('JPY')).toBe(0);
    expect(currencyDigits('KWD')).toBe(3);
    expect(currencyDigits('not a code')).toBe(2);
  });

  it('names the month of a school day without shifting time zones', () => {
    expect(monthYearTitle('2026-12-01', 'en')).toBe('December 2026');
  });

  it('names weekdays from Sunday as 0', () => {
    expect(weekdayName(0, 'en', 'long')).toBe('Sunday');
    expect(weekdayName(5, 'en', 'short')).toBe('Fri');
  });
});
