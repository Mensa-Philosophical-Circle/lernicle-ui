import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { InlineError } from './InlineError';

describe('InlineError', () => {
  it('says what failed and retries', () => {
    const onRetry = vi.fn();

    render(
      <InlineError
        title="We could not load your payments."
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('load your payments');
    fireEvent.click(screen.getByRole('button'));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
