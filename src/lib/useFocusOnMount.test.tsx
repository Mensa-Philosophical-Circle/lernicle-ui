import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useFocusOnMount } from './useFocusOnMount';

function Box() {
  const ref = useFocusOnMount<HTMLInputElement>();

  return <input ref={ref} aria-label="name" />;
}

describe('useFocusOnMount', () => {
  it('puts the cursor in the field when it appears', () => {
    render(<Box />);
    expect(screen.getByLabelText('name')).toHaveFocus();
  });
});
