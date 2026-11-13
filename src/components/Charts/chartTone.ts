import type { ChartTone } from './Charts.types';

/**
 * The theme's chart colour, ready for a style attribute. `--ui-chart-*` is
 * set by the package's theme file in the app's own colour format.
 */
export const chartColor = (tone: ChartTone) => `var(--ui-chart-${tone})`;

export const CHART_LINE_COLOR = 'var(--ui-chart-line)';
