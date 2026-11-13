/** A chart colour from the school's theme: --chart-1 to --chart-5. */
export type ChartTone = 1 | 2 | 3 | 4 | 5;

export interface ChartSeries {
  label: string;
  tone: ChartTone;
}

export interface ChartGroup {
  /** The label under this group of bars. */
  label: string;
  /** One value per series, in series order. */
  values: number[];
  /** Tooltip heading; the label if not given. */
  tipTitle?: string;
  /** Tooltip lines, already formatted with their currency. */
  tipLines: string[];
  /** Makes the whole group a button. */
  onPick?: () => void;
  /** Read out when `onPick` is given. */
  pickLabel?: string;
}

export interface BarsChartProps {
  /** A sentence describing the chart, for screen readers. */
  label: string;
  series: ChartSeries[];
  groups: ChartGroup[];
  /** A line over the bars: one value per group, null for a gap. */
  line?: (number | null)[];
  /** Writes an axis value: currency or percent, short enough for 40px. */
  formatTick: (value: number) => string;
  height?: number;
}

export interface DonutSegment {
  label: string;
  value: number;
  tone: ChartTone;
  /** Formatted amount beside the percent. */
  amount?: string;
}

export interface DonutChartProps {
  label: string;
  segments: DonutSegment[];
  /** Big text in the middle. */
  center?: string;
  centerSub?: string;
}

export interface ChartLegendItem {
  label: string;
  tone?: ChartTone;
  /** A short line rather than a square. */
  line?: boolean;
}
