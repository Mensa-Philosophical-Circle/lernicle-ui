import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AmountField } from './';

describe('AmountField', () => {
  it('shows the currency and reports what was typed', () => {
    const onChange = vi.fn();

    render(
      <AmountField
        aria-label="Amount"
        currency="KES"
        value=""
        onChange={onChange}
      />,
    );
    expect(screen.getByText('KES')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '12.50' },
    });
    expect(onChange).toHaveBeenCalledWith('12.50');
  });
});
