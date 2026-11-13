import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SaveButton } from './';

describe('SaveButton', () => {
  it('saves on click', () => {
    const onClick = vi.fn();

    render(<SaveButton label="Save" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('cannot be pressed with nothing to save or while working', () => {
    const { rerender } = render(
      <SaveButton disabled label="Save" onClick={vi.fn()} />,
    );

    expect(screen.getByRole('button')).toBeDisabled();
    rerender(
      <SaveButton busy busyLabel="Saving" label="Save" onClick={vi.fn()} />,
    );
    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });
});
