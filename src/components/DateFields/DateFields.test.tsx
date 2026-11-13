import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { DateField } from './DateField';
import { DateRangeField } from './DateRangeField';
import { MonthField } from './MonthField';
import { TimeField } from './TimeField';

vi.mock('../../provider/LernicleUIProvider', async (original) => ({
  ...(await original<typeof import('../../provider/LernicleUIProvider')>()),
  useUIFormat: () => ({ locale: 'en-GB', timeZone: 'UTC' }),
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = vi.fn();
});

describe('DateField', () => {
  it('starts empty and picks a day in a centred pop-up', () => {
    const onChange = vi.fn();

    render(<DateField label="Date" value="" onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Date: Choose' })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Date: Choose' }));
    const popup = screen.getByRole('dialog', { name: 'Date' });

    fireEvent.click(within(popup).getByRole('button', { name: 'Next year' }));
    fireEvent.click(within(popup).getAllByRole('button', { name: /^\w+, 1 / })[0]);
    expect(onChange).toHaveBeenCalledWith(expect.stringMatching(/-01$/));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens on the chosen month and refuses days outside the limits', () => {
    render(
      <DateField
        label="Date"
        max="2026-03-10"
        value="2026-03-09"
        onChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Date: 9 Mar 2026' }));

    expect(screen.getByText('March 2026')).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Wednesday, 11 March 2026' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Monday, 9 March 2026' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('DateRangeField', () => {
  it('empties To when From moves past it', () => {
    const onChange = vi.fn();

    render(
      <DateRangeField
        fromLabel="From"
        toLabel="To"
        value={{ from: '2026-03-01', to: '2026-03-05' }}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /^From:/ }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Tuesday, 10 March 2026' }),
    );

    expect(onChange).toHaveBeenCalledWith({ from: '2026-03-10', to: '' });
  });
});

describe('MonthField', () => {
  it('picks a month from a year grid', () => {
    const onChange = vi.fn();

    render(<MonthField label="Month" value="2026-03" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Month: March 2026' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous year' }));
    fireEvent.click(screen.getByRole('button', { name: 'June 2025' }));

    expect(onChange).toHaveBeenCalledWith('2025-06');
  });

  it('refuses months past the limit', () => {
    render(
      <MonthField
        label="Month"
        max="2026-03"
        value="2026-03"
        onChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Month: March 2026' }));

    expect(screen.getByRole('button', { name: 'April 2026' })).toBeDisabled();
  });
});

describe('TimeField', () => {
  it('lists times and accepts a typed one', () => {
    const onChange = vi.fn();

    render(<TimeField aria-label="Start" value="" onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox', { name: 'Start' }));
    fireEvent.change(screen.getByPlaceholderText('Type a time'), {
      target: { value: '14:37' },
    });
    fireEvent.click(screen.getByText('14:37'));

    expect(onChange).toHaveBeenCalledWith('14:37');
  });

  it('shows a value that is not on the list', () => {
    render(<TimeField aria-label="Start" value="07:07" onChange={vi.fn()} />);

    expect(screen.getByRole('combobox', { name: 'Start' })).toHaveTextContent(
      '7:07',
    );
  });
});
