import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SaveBar } from './';

describe('SaveBar', () => {
  it('announces where the form stands and shows its buttons', () => {
    render(
      <SaveBar status="2 things to fix." tone="bad">
        <button aria-label="Save" type="button">
          Save
        </button>
      </SaveBar>,
    );
    expect(screen.getByRole('status').textContent).toBe('2 things to fix.');
    expect(screen.getByRole('status').className).toContain('text-destructive');
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('marks unsaved changes as a warning', () => {
    render(
      <SaveBar status="2 not saved yet." tone="warning">
        <button aria-label="Save" type="button">
          Save
        </button>
      </SaveBar>,
    );
    expect(screen.getByRole('status').className).toContain(
      'text-warning-on-soft',
    );
  });
});
