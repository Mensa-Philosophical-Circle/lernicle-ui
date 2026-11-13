import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BankLockPanel } from './';

describe('BankLockPanel', () => {
  it('gives the page’s own reason and a way to connect', () => {
    render(
      <BankLockPanel connectHref="/apps" reason="Connect it to start payroll." />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Connect your bank account to unlock this',
      }),
    ).toBeVisible();
    expect(screen.getByText('Connect it to start payroll.')).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Connect bank account' }),
    ).toHaveAttribute('href', '/apps');
  });

  it('offers to try again when the check failed', () => {
    const onRetry = vi.fn();

    render(
      <BankLockPanel connectHref="/apps" reason="Unused." onRetry={onRetry} />,
    );

    expect(screen.queryByText('Unused.')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
