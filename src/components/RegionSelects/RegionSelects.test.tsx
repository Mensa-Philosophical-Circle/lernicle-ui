import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import {
  CountrySelect,
  LanguageSelect,
  TimezoneSelect,
} from './';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = vi.fn();
});

describe('pickers', () => {
  it('leaves country and time zone empty until chosen', () => {
    render(
      <>
        <CountrySelect aria-label="Country" value="" onChange={vi.fn()} />
        <TimezoneSelect aria-label="Zone" value="" onChange={vi.fn()} />
      </>,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent(
      'Choose a country',
    );
    expect(screen.getByRole('combobox', { name: 'Zone' })).toHaveTextContent(
      'Choose a time zone',
    );
  });

  it('lists languages in their own names', () => {
    const onChange = vi.fn();

    render(<LanguageSelect value="" onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Français'));

    expect(onChange).toHaveBeenCalledWith('fr');
  });

});
