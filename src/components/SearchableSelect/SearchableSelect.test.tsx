import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { SearchableSelect } from './';

beforeAll(() => {
  // cmdk and Radix use these; jsdom has neither.
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = vi.fn();
});

const options = [
  { value: 'a', label: 'Art' },
  { value: 'b', label: 'Biology', hint: 'Science' },
];
const many = Array.from({ length: 12 }, (_, i) => ({
  value: `v${i}`,
  label: `Option ${i}`,
}));

const open = () => fireEvent.click(screen.getByRole('combobox'));

describe('SearchableSelect', () => {
  it('lists options that share a group under its heading', () => {
    render(
      <SearchableSelect
        options={[
          { value: 'all', label: 'Everyone' },
          { value: 'a', label: 'Art', group: 'Subjects' },
          { value: 'b', label: 'Bus', group: 'Services' },
        ]}
        value=""
        onChange={vi.fn()}
      />,
    );
    open();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('starts empty with no choice made for the person', () => {
    render(
      <SearchableSelect
        options={options}
        placeholder="Choose a subject"
        value=""
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Choose a subject');
  });

  it('chooses one and closes', () => {
    const onChange = vi.fn();

    render(<SearchableSelect options={options} value="" onChange={onChange} />);
    open();
    fireEvent.click(screen.getByText('Art'));

    expect(onChange).toHaveBeenCalledWith('a');
    expect(screen.queryByText('Biology')).not.toBeInTheDocument();
  });

  it('adds and removes choices, staying open, in multi select', () => {
    function Multi() {
      const [value, setValue] = useState(['a']);

      return (
        <SearchableSelect
          multiple
          options={options}
          value={value}
          onChange={setValue}
        />
      );
    }

    render(<Multi />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Art');
    open();
    fireEvent.click(screen.getByText('Biology'));
    expect(screen.getByRole('combobox')).toHaveTextContent('2 chosen');
    fireEvent.click(screen.getByText('Biology'));
    expect(screen.getByRole('combobox')).toHaveTextContent('Art');
  });

  it('searches long lists but not short ones', () => {
    const { unmount } = render(
      <SearchableSelect options={options} value="" onChange={vi.fn()} />,
    );

    open();
    expect(screen.queryByRole('combobox', { name: /search/i })).toBeNull();
    unmount();

    render(<SearchableSelect options={many} value="" onChange={vi.fn()} />);
    open();
    fireEvent.change(screen.getByPlaceholderText('Type to search'), {
      target: { value: 'option 11' },
    });
    expect(screen.getByText('Option 11')).toBeVisible();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('hands the typed text to a server search after a pause', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();

    render(
      <SearchableSelect
        options={options}
        value=""
        onChange={vi.fn()}
        onSearch={onSearch}
      />,
    );
    open();
    fireEvent.change(screen.getByPlaceholderText('Type to search'), {
      target: { value: 'zo' },
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    vi.useRealTimers();

    expect(onSearch).toHaveBeenLastCalledWith('zo');
    // The server decides what matches, so nothing is filtered out here.
    expect(screen.getByText('Art')).toBeVisible();
  });

  it('shows the name of a chosen value that is not on this page of results', () => {
    render(
      <SearchableSelect
        options={options}
        selectedOptions={[{ value: 'z', label: 'Zoology' }]}
        value="z"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Zoology');
  });

  it('can offer an empty choice', () => {
    const onChange = vi.fn();

    render(
      <SearchableSelect
        clearLabel="All subjects"
        options={options}
        value="a"
        onChange={onChange}
      />,
    );
    open();
    fireEvent.click(screen.getByText('All subjects'));

    expect(onChange).toHaveBeenCalledWith('');
  });
});
