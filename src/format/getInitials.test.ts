import { describe, it, expect } from 'vitest';

import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('returns initials from full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });
  it('returns single initial for single name', () => {
    expect(getInitials('John')).toBe('J');
  });
  it('handles multiple names', () => {
    expect(getInitials('John Michael Doe')).toBe('JMD');
  });
  it('handles empty string', () => {
    expect(getInitials('')).toBe('');
  });
  it('handles null', () => {
    expect(getInitials(null as any)).toBe('');
  });
  it('handles extra whitespace', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });
  it('uppercases initials', () => {
    expect(getInitials('john doe')).toBe('JD');
  });
});
