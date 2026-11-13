import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusPill } from './';

describe('StatusPill info tone', () => {
  it('uses the theme info colour', () => {
    render(<StatusPill label="In progress" tone="info" />);

    expect(screen.getByText('In progress').className).toContain('text-info');
  });
});
