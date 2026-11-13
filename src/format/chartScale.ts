const NICE = [1, 2, 2.5, 5, 10];

/** A round step that fits the range into about `count` intervals. */
function niceStep(range: number, count: number): number {
  const rough = range / count;
  const power = 10 ** Math.floor(Math.log10(rough));
  const step = NICE.find((nice) => nice * power >= rough) ?? 10;

  return step * power;
}

export interface ChartScale {
  /** Axis values, highest first. */
  ticks: number[];
  min: number;
  max: number;
  /** Distance from the top of the plot, 0 to 100. */
  topPercent: (value: number) => number;
}

/** Round axis values that hold the data, and always include zero. */
export function chartScale(values: number[], intervals = 4): ChartScale {
  const finite = values.filter(Number.isFinite);
  const low = Math.min(0, ...finite);
  const high = Math.max(0, ...finite);

  if (low === high) {
    return { ticks: [0], min: 0, max: 1, topPercent: () => 100 };
  }

  const step = niceStep(high - low, intervals);
  const min = Math.floor(low / step) * step;
  const max = Math.ceil(high / step) * step;
  const count = Math.round((max - min) / step);
  const ticks = Array.from(
    { length: count + 1 },
    (_, index) => max - index * step,
  );

  return {
    ticks,
    min,
    max,
    topPercent: (value) => ((max - value) / (max - min)) * 100,
  };
}
