import { BarsChart, ChartEmpty, ChartLegend, ChartSection, DonutChart, LineChart } from '../../src/charts';

const GROUPS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((label, index) => ({
  label,
  values: [400 + index * 120, 300 + (index % 3) * 150],
  tipLines: [`In: ${400 + index * 120}`, `Out: ${300 + (index % 3) * 150}`],
}));

export function KitCharts() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
      <ChartSection caption="GHS only" title="Cash flow (6 months)">
        <ChartLegend
          items={[
            { label: 'Money in', tone: 1 },
            { label: 'Money out', tone: 2 },
            { label: 'Net', line: true },
          ]}
        />
        <BarsChart
          formatTick={(value) => `${value / 1000}k`}
          groups={GROUPS}
          label="Money in and out for six months"
          line={GROUPS.map((group) => group.values[0] - group.values[1])}
          series={[
            { label: 'Money in', tone: 1 },
            { label: 'Money out', tone: 2 },
          ]}
        />
      </ChartSection>
      <ChartSection title="Attendance trend">
        <LineChart
          formatTick={(value) => `${value}%`}
          groups={GROUPS}
          label="Attendance trend"
          line={[92, 95, 90, 88, 97, 94]}
        />
      </ChartSection>
      <ChartSection caption="Required fees billed in this period." title="Fee collection rate">
        <DonutChart
          center="75%"
          centerSub="Collected"
          label="Fee collection rate"
          segments={[
            { label: 'Paid', value: 75, tone: 1, amount: 'GHS 7,500' },
            { label: 'Part paid', value: 15, tone: 3, amount: 'GHS 1,500' },
            { label: 'Owed', value: 10, tone: 2, amount: 'GHS 1,000' },
          ]}
        />
      </ChartSection>
      <ChartSection title="Expense breakdown">
        <ChartEmpty text="No figures for this period yet." />
      </ChartSection>
    </div>
  );
}
