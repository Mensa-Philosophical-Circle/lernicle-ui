import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CentredState } from './';

describe('CentredState', () => {
  it('shows the heading, sentence and actions it is given', () => {
    render(
      <CentredState
        actions={<a href="#clear">Clear</a>}
        body="Try different words."
        title="No matches"
      />,
    );

    expect(screen.getByRole('heading', { name: 'No matches' })).toBeTruthy();
    expect(screen.getByText('Try different words.')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Clear' })).toBeTruthy();
  });
});
