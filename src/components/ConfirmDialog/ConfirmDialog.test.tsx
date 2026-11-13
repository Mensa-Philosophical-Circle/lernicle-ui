import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ConfirmDialog } from './';

const base = {
  open: true,
  title: 'Delete this record?',
  body: 'It will be removed from your books.',
  confirmLabel: 'Delete record',
};

describe('ConfirmDialog', () => {
  it('says what will happen and confirms', () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmDialog {...base} onConfirm={onConfirm} onOpenChange={vi.fn()} />,
    );

    expect(screen.getByRole('alertdialog')).toHaveAccessibleDescription(
      base.body,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete record' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('cancels without confirming', () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <ConfirmDialog
        {...base}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('cannot be closed or repeated while busy', () => {
    const onOpenChange = vi.fn();

    render(
      <ConfirmDialog
        {...base}
        busy
        busyLabel="Deleting…"
        onConfirm={vi.fn()}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByRole('button', { name: 'Deleting…' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('shows why the last attempt failed', () => {
    render(
      <ConfirmDialog
        {...base}
        error="We couldn't delete it."
        onConfirm={vi.fn()}
        onOpenChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      "We couldn't delete it.",
    );
  });
});

describe('ConfirmDialog warning', () => {
  it('shows the knock-on effect in its own note', () => {
    render(
      <ConfirmDialog
        open
        body="The account will be removed."
        confirmLabel="Delete account"
        title="Delete this account?"
        warning="The Money pages will lock."
        onConfirm={() => undefined}
        onOpenChange={() => undefined}
      />,
    );

    expect(screen.getByText('The Money pages will lock.')).toBeInTheDocument();
  });
});
