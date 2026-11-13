import type { BarsChartProps } from '../Charts.types';

import { BarsChart } from '../BarsChart';

/** A trend line alone: the same plot as BarsChart, with no bars. */
export function LineChart({
  groups,
  line,
  ...plot
}: Omit<BarsChartProps, 'series'> & { line: (number | null)[] }) {
  return (
    <BarsChart
      {...plot}
      groups={groups.map((group) => ({ ...group, values: [] }))}
      line={line}
      series={[]}
    />
  );
}
