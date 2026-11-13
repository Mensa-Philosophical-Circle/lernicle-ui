import type { ReactElement } from 'react';

import { render as rtlRender, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MoneyTotals } from './';
import { moneyLines, totalsByCurrency } from '../../format/currencyTotals';
import { LernicleUIProvider } from '../../provider/LernicleUIProvider';

const render = (ui: ReactElement, currency?: string) =>
  rtlRender(
    <LernicleUIProvider currency={currency} locale="en-US">
      {ui}
    </LernicleUIProvider>,
  );

// Intl writes narrow and non-breaking spaces; compare with plain ones.
const plain = (text: string | null) =>
  (text ?? '').replace(/[\u00a0\u202f]/g, ' ');

describe('MoneyTotals', () => {
  it('shows one currency as a single formatted amount', () => {
    const totals = totalsByCurrency(
      [
        { amount: 1000, currency: 'EUR' },
        { amount: 250.5, currency: 'EUR' },
      ],
      (row) => row.amount,
      (row) => row.currency,
    );

    render(<MoneyTotals totals={totals} />);

    expect(plain(screen.getByText(/1,250\.50/).textContent)).toBe('€1,250.50');
  });

  it('keeps different currencies on their own lines and never adds them', () => {
    const totals = totalsByCurrency(
      [
        { amount: 1000, currency: 'EUR' },
        { amount: 500, currency: 'USD' },
        { amount: 2000, currency: 'KES' },
      ],
      (row) => row.amount,
      (row) => row.currency,
    );

    const { container } = render(<MoneyTotals totals={totals} />);
    const lines = [...container.querySelectorAll('[data-currency]')].map(
      (line) => [line.getAttribute('data-currency'), plain(line.textContent)],
    );

    expect(lines).toEqual([
      ['EUR', '€1,000.00'],
      ['KES', 'KES 2,000.00'],
      ['USD', '$500.00'],
    ]);
    // 3,500 would be the sum of unlike currencies.
    expect(container.textContent).not.toMatch(/3,500/);
  });

  it('shows a bare number when the records and the school have no currency', () => {
    const totals = totalsByCurrency(
      [{ amount: 1500 }, { amount: 250 }],
      (row) => row.amount,
      () => null,
    );

    const { container } = render(<MoneyTotals totals={totals} />);

    expect(container.textContent).toBe('1,750.00'.replace('.00', ''));
    expect(container.textContent).not.toMatch(/[₦$€£]|NGN/);
  });

  it('never invents a naira sign for an empty list', () => {
    const { container } = render(<MoneyTotals totals={[]} />);

    expect(container.textContent).toBe('0');
  });

  it('uses the school currency only for records that carry none, once set', () => {
    const totals = totalsByCurrency(
      [
        { amount: 100, currency: null },
        { amount: 50, currency: 'USD' },
      ],
      (row) => row.amount,
      (row) => row.currency,
    );

    const { container } = render(<MoneyTotals totals={totals} />, 'GBP');

    expect(plain(container.textContent)).toContain('$50.00');
    expect(plain(container.textContent)).toContain('£100.00');
  });

  it('shortens large amounts when compact', () => {
    const { container } = render(
      <MoneyTotals compact totals={[{ currency: 'USD', total: 1_200_000 }]} />,
    );

    expect(plain(container.textContent)).toBe('$1.2M');
  });

  it('can say so in words when there are no totals', () => {
    render(<MoneyTotals emptyText="None in this view" totals={[]} />);

    expect(screen.getByText('None in this view')).toBeInTheDocument();
  });

  it('turns totals into one line per currency', () => {
    expect(
      moneyLines(
        [
          { currency: 'GHS', total: 5 },
          { currency: 'NGN', total: 7 },
        ],
        (total, currency) => `${currency} ${total}`,
      ),
    ).toEqual(['GHS 5', 'NGN 7']);
  });
});
