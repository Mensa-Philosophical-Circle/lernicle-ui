import { describe, expect, it } from 'vitest';

import { chartScale } from './chartScale';

describe('chartScale', () => {
  it('rounds the top of the axis up and starts at zero', () => {
    const scale = chartScale([120, 870]);

    expect(scale.max).toBe(1000);
    expect(scale.min).toBe(0);
    expect(scale.ticks).toEqual([1000, 750, 500, 250, 0]);
  });

  it('places values from the top of the plot', () => {
    const scale = chartScale([100]);

    expect(scale.topPercent(scale.max)).toBe(0);
    expect(scale.topPercent(0)).toBe(100);
  });

  it('reaches below zero for losses', () => {
    const scale = chartScale([-50, 100]);

    expect(scale.min).toBeLessThan(0);
    expect(scale.ticks).toContain(0);
  });

  it('copes with nothing to show', () => {
    const scale = chartScale([0, 0]);

    expect(scale.ticks).toEqual([0]);
    expect(scale.topPercent(0)).toBe(100);
  });

  it('ignores values that are not numbers', () => {
    expect(chartScale([Number.NaN, 10]).max).toBe(10);
  });
});
