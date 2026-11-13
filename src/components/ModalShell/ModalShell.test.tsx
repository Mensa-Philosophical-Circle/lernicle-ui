import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ModalShell } from './';

describe('ModalShell', () => {
  it('shows its title and body and closes from the close button', () => {
    const onOpenChange = vi.fn();

    render(
      <ModalShell open title="Add a fee" onOpenChange={onOpenChange}>
        <p>Body</p>
      </ModalShell>,
    );

    expect(screen.getByRole('dialog', { name: 'Add a fee' })).toBeVisible();
    expect(screen.getByText('Body')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('is announced as an alert when it asks a question', () => {
    render(
      <ModalShell alert open title="Delete?" onOpenChange={vi.fn()}>
        <p>Body</p>
      </ModalShell>,
    );

    expect(screen.getByRole('alertdialog', { name: 'Delete?' })).toBeVisible();
  });

  it('applies the chosen width and shows actions', () => {
    render(
      <ModalShell
        open
        actions={
          <button aria-label="Save" type="button">
            Save
          </button>
        }
        size="lg"
        title="Wide"
        onOpenChange={vi.fn()}
      >
        <p>Body</p>
      </ModalShell>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('max-w-[660px]');
    expect(screen.getByRole('button', { name: 'Save' })).toBeVisible();
  });
});
