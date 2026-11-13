import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ChoiceGroup } from '../ChoiceGroup';
import { FormField } from './';
import { FormSection } from '../FormSection';

describe('FormField', () => {
  it('ties the label to the control and marks it required', () => {
    render(
      <FormField required htmlFor="name" label="Name">
        <input id="name" />
      </FormField>,
    );

    expect(screen.getByLabelText(/Name/)).toHaveAttribute('id', 'name');
    expect(screen.getByText('*')).toBeVisible();
  });

  it('shows a hint and an error', () => {
    render(
      <FormField error="Too short" hint="As on the form" label="Name">
        <input />
      </FormField>,
    );

    expect(screen.getByText('As on the form')).toBeVisible();
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });
});

describe('FormSection', () => {
  it('shows a title, and a note only when there is one', () => {
    render(
      <FormSection title="Who">
        <p>Fields</p>
      </FormSection>,
    );

    expect(screen.getByRole('heading', { name: 'Who' })).toBeVisible();
    expect(screen.getByText('Fields')).toBeVisible();
  });
});

describe('ChoiceGroup', () => {
  it('marks the chosen option and reports a new one', () => {
    const onChange = vi.fn();

    render(
      <ChoiceGroup
        label="Gender"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        value="a"
        onChange={onChange}
      />,
    );

    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
