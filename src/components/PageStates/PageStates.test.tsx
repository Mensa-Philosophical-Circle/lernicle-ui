import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FiguresRow } from '../FiguresRow';
import { FilterPopover } from '../ListToolbar/FilterPopover';
import { ListToolbar } from '../ListToolbar';
import {
  ListSkeleton,
  NoMatches,
  PageError,
  PageNote,
  StatePanel,
} from './';
import { Pager } from '../Pager';
import { StatusPill } from '../StatusPill';
import { UnderlineTabs } from '../UnderlineTabs';
import { ViewOnlyNote } from '../ViewOnlyNote';

describe('state pieces', () => {
  it('shows an empty panel with its actions', () => {
    render(
      <StatePanel
        actions={<a href="/x">Add staff</a>}
        body="Add your staff first."
        title="No staff yet"
      />,
    );

    expect(screen.getByRole('heading', { name: 'No staff yet' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Add staff' })).toBeVisible();
  });

  it('offers to try again after an error', () => {
    const onRetry = vi.fn();

    render(<PageError title="Could not load" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Nothing has changed');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('clears filters from the no-match message', () => {
    const onClear = vi.fn();

    render(<NoMatches text="Nothing matches." onClear={onClear} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('announces danger notes at once and others politely', () => {
    render(
      <>
        <PageNote tone="danger">Failed</PageNote>
        <PageNote>Saved</PageNote>
      </>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('hides skeletons from screen readers', () => {
    const { container } = render(<ListSkeleton rows={2} />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('ViewOnlyNote', () => {
  it('is absent when changes are allowed', () => {
    const { container } = render(<ViewOnlyNote reason={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('explains a login without permission', () => {
    render(<ViewOnlyNote reason="permission" />);
    expect(screen.getByRole('status')).toBeVisible();
  });

  it('leaves an ended subscription to the announcement bar', () => {
    const { container } = render(<ViewOnlyNote reason="subscription" />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe('FiguresRow', () => {
  it('shows one line per currency and a note', () => {
    render(
      <FiguresRow
        figures={[
          { label: 'Paid', lines: ['GHS 10', 'NGN 20'], sub: '2 people' },
          { label: 'Owed', lines: [], emptyText: 'None in this view' },
        ]}
        label="Totals"
        note="Covers all matching records."
      />,
    );

    expect(screen.getByRole('region', { name: 'Totals' })).toBeVisible();
    expect(screen.getByText('GHS 10')).toBeVisible();
    expect(screen.getByText('NGN 20')).toBeVisible();
    expect(screen.getByText('None in this view')).toBeVisible();
  });
});

describe('Pager', () => {
  const base = { page: 2, pageSize: 20, total: 45, totalPages: 3 };

  it('moves between pages and says where it is', () => {
    const setPage = vi.fn();

    render(<Pager {...base} setPage={setPage} />);
    expect(screen.getByText('21 to 40 of 45')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(setPage).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it('stops at the ends', () => {
    render(<Pager {...base} page={3} setPage={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('is hidden when one page holds everything', () => {
    const { container } = render(
      <Pager
        page={1}
        pageSize={20}
        setPage={vi.fn()}
        total={5}
        totalPages={1}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});

describe('UnderlineTabs', () => {
  const tabs = [
    { value: 'a', label: 'One' },
    { value: 'b', label: 'Two' },
  ];

  it('marks the open tab and switches on click and arrow keys', () => {
    const onChange = vi.fn();

    render(
      <UnderlineTabs label="L" tabs={tabs} value="a" onChange={onChange} />,
    );
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledWith('b');
    onChange.mockClear();
    fireEvent.keyDown(screen.getByRole('tab', { name: 'One' }), {
      key: 'ArrowRight',
    });
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('ListToolbar and filters', () => {
  it('reports what was typed', () => {
    const onChange = vi.fn();

    render(<ListToolbar label="Search staff" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search staff' }), {
      target: { value: 'ada' },
    });
    expect(onChange).toHaveBeenCalledWith('ada');
  });

  it('shows how many filters are on and clears them', () => {
    const onClear = vi.fn();

    render(
      <FilterPopover count={2} onClear={onClear}>
        <p>Fields</p>
      </FilterPopover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Filter, 2 on' }));
    expect(screen.getByText('Fields')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});

describe('StatusPill', () => {
  it('always has a word', () => {
    render(<StatusPill label="Paid" tone="good" />);
    expect(screen.getByText('Paid')).toHaveClass('text-success');
  });

  it('reads out a loading label when given one', () => {
    render(<ListSkeleton label="Loading…" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  });
});
