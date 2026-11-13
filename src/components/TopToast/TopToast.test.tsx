import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TopToast } from './';

describe('TopToast', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('shows nothing without text', () => {
    const { container } = render(<TopToast text="" onDismiss={() => {}} />);

    expect(container.firstChild).toBeNull();
  });

  it('can be dismissed, and goes by itself', () => {
    const onDismiss = vi.fn();

    render(<TopToast text="Saved." onDismiss={onDismiss} />);
    expect(screen.getByRole('status').textContent).toContain('Saved.');
    fireEvent.click(screen.getByRole('button'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    act(() => void vi.advanceTimersByTime(6000));
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });
});
