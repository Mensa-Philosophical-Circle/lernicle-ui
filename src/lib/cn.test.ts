import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('lets a later class win and drops empty values', () => {
    expect(cn('px-2 text-sm', false, undefined, 'px-4')).toBe('text-sm px-4');
  });
});
