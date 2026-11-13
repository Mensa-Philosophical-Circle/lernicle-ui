import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BarsChart } from './BarsChart';
import {
  ChartEmpty,
  ChartLegend,
  ChartSection,
} from './ChartPieces';
import { DonutChart } from './DonutChart';
import { LineChart } from './LineChart';

vi.mock('../../provider/LernicleUIProvider', async (original) => ({
  ...(await original<typeof import('../../provider/LernicleUIProvider')>()),
  useUIFormat: () => ({ percent: (value: number) => `${value}%` }),
}));

const groups = [
  { label: 'Jan', values: [10, 5], tipLines: ['In: 10', 'Out: 5'] },
  { label: 'Feb', values: [20, 8], tipLines: ['In: 20', 'Out: 8'] },
];
const series = [
  { label: 'In', tone: 1 as const },
  { label: 'Out', tone: 2 as const },
];

describe('BarsChart', () => {
  it('describes itself and shows a tooltip on hover', () => {
    const { container } = render(
      <BarsChart
        formatTick={String}
        groups={groups}
        label="Income and spending"
        series={series}
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Income and spending' }),
    ).toBeVisible();
    fireEvent.mouseEnter(container.querySelectorAll('[data-chart-group]')[1]);
    expect(screen.getByText('In: 20')).toBeInTheDocument();
  });

  it('uses theme colours only', () => {
    const { container } = render(
      <BarsChart
        formatTick={String}
        groups={groups}
        label="L"
        series={series}
      />,
    );
    const colored = container.querySelector('[style*="--ui-chart-1"]');

    expect(colored).not.toBeNull();
  });

  it('runs a group’s action when it has one', () => {
    const onPick = vi.fn();

    render(
      <BarsChart
        formatTick={String}
        groups={[{ ...groups[0], onPick, pickLabel: 'Open January' }]}
        label="L"
        series={series}
      />,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Open January' }),
    );
    expect(onPick).toHaveBeenCalledOnce();
  });
});

describe('LineChart', () => {
  it('draws a line and no bars', () => {
    const { container } = render(
      <LineChart
        formatTick={String}
        groups={groups}
        label="Trend"
        line={[1, 2]}
      />,
    );

    expect(container.querySelector('polyline')).not.toBeNull();
    expect(container.querySelector('.rounded-t-\\[5px\\]')).toBeNull();
  });
});

describe('DonutChart', () => {
  it('shows each slice as a percent with its amount', () => {
    render(
      <DonutChart
        center="75%"
        centerSub="Collected"
        label="Fees"
        segments={[
          { label: 'Paid', value: 75, tone: 1, amount: 'GHS 75' },
          { label: 'Owed', value: 25, tone: 2, amount: 'GHS 25' },
        ]}
      />,
    );

    expect(screen.getByText('75%', { selector: 'span' })).toBeVisible();
    expect(screen.getByText('25%')).toBeVisible();
    expect(screen.getByText('GHS 75')).toBeVisible();
    expect(screen.getByRole('img', { name: 'Fees' })).toBeVisible();
  });
});

describe('chart surroundings', () => {
  it('titles a chart, explains colours, and covers no data', () => {
    render(
      <ChartSection caption="6 months" title="Cash flow">
        <ChartLegend items={[{ label: 'In', tone: 1 }, { label: 'Net', line: true }]} />
        <ChartEmpty text="No figures yet." />
      </ChartSection>,
    );

    expect(screen.getByRole('heading', { name: 'Cash flow' })).toBeVisible();
    expect(screen.getByText('Net')).toBeVisible();
    expect(screen.getByText('No figures yet.')).toBeVisible();
  });
});
