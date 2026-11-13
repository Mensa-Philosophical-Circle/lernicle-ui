import { describe, expect, it } from 'vitest';

// @ts-expect-error plain JS module without types
import { findProblems } from './classRules.mjs';

const tokens = (source: string) =>
  (findProblems(source) as { token: string }[]).map((p) => p.token);

describe('class rules', () => {
  it('passes classes that mean the same in v3 and v4', () => {
    expect(
      tokens(`"rounded-md border border-border focus-visible:ring-2 focus-visible:ring-ring shadow-md"`),
    ).toEqual([]);
  });

  it('catches classes that changed, including behind variants', () => {
    expect(
      tokens(`"rounded-sm focus:ring dark:shadow-sm bg-opacity-50 data-[state=open]:animate-in"`),
    ).toEqual(['rounded-sm', 'focus:ring', 'dark:shadow-sm', 'bg-opacity-50', 'data-[state=open]:animate-in']);
  });

  it('ignores prose and code strings', () => {
    expect(tokens(`"Pick a ring for the shadow."`)).toEqual([]);
    expect(tokens(`"ring"`)).toEqual(['ring']);
  });
});
