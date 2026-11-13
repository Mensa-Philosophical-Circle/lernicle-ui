import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormField } from './';

describe('FormField aside', () => {
  it('shows quiet text on the label row and leaves the label as it was', () => {
    render(
      <FormField aside="3 of 255" htmlFor="f" label="Subject">
        <input id="f" />
      </FormField>,
    );

    expect(screen.getByText('3 of 255')).toBeTruthy();
    expect(screen.getByLabelText('Subject')).toBeTruthy();
  });
});
