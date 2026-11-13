import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FilterPopover } from './';

describe('FilterPopover footer', () => {
  it('resets and closes from the footer when given a Done label', () => {
    const onClear = vi.fn();

    render(
      <FilterPopover
        count={1}
        doneLabel="Done"
        resetLabel="Reset"
        onClear={onClear}
      >
        <span>Fields</span>
      </FilterPopover>,
    );
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onClear).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByText('Fields')).toBeNull();
  });
});
