import { fireEvent, render, screen, within } from '@testing-library/react';

import { DataTable } from './';
import type { DataTableColumn } from './DataTable.types';
import { LernicleUIProvider } from '../../provider/LernicleUIProvider';

interface Person {
  id: string;
  name: string;
  role: string;
  code: string;
  email: string;
}

const people: Person[] = [
  { id: 'a', name: 'Ada Obi', role: 'Teacher', code: 'T-1', email: 'ada@x.org' },
  { id: 'b', name: 'Bayo Ade', role: 'Bursar', code: 'T-2', email: 'bayo@x.org' },
];

const columns: DataTableColumn<Person>[] = [
  {
    id: 'name',
    header: 'Name',
    main: true,
    cell: (p) => p.name,
    secondary: (p) => ({ narrow: p.role, medium: p.code, wide: p.email }),
    sortable: true,
  },
  { id: 'role', header: 'Role', from: 'tablet', cell: (p) => p.role },
  { id: 'code', header: 'Code', from: 'wide', muted: true, cell: (p) => p.code },
];

function selection(ticked: string[] = []) {
  return { ids: new Set(ticked), toggle: vi.fn(), setPage: vi.fn() };
}

const open = (props: Partial<Parameters<typeof DataTable<Person>>[0]> = {}) =>
  render(
    <LernicleUIProvider>
      <DataTable
        columns={columns}
        label="Staff"
        rowKey={(p) => p.id}
        rowName={(p) => p.name}
        rows={people}
        {...props}
      />
    </LernicleUIProvider>,
  );

describe('DataTable', () => {
  it('shows a row per record and names the list', () => {
    open();

    const list = screen.getByRole('region', { name: 'Staff' });

    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(list).getAllByText('Ada Obi')).toHaveLength(1);
  });

  it('puts later columns behind the list’s own width, not the screen’s', () => {
    open();
    const role = screen.getAllByText('Teacher').find((el) => el.className.includes('flex-none'));
    const code = screen.getAllByText('T-1').find((el) => el.className.includes('flex-none'));

    expect(role?.className).toContain('[@container(min-width:600px)]:block');
    expect(code?.className).toContain('[@container(min-width:800px)]:block');
    expect(code?.className).toContain('text-muted-foreground');
  });

  it('shows the details under the name, one set per width', () => {
    open();

    expect(screen.getByText('ada@x.org').className).toContain('min-width:800px');
    expect(screen.getAllByText('T-1').some((el) => el.className.includes('hidden truncate [@container(min-width:600px)]:block'))).toBe(true);
  });

  it('ticks a row, and all of them, through the selection it is given', () => {
    const picked = selection();

    open({ selection: picked, selectAllLabel: 'Select every person' });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Ada Obi' }));
    expect(picked.toggle).toHaveBeenCalledWith('a');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select every person' }));
    expect(picked.setPage).toHaveBeenCalledWith(['a', 'b'], true);
  });

  it('shows no box for a row that cannot be ticked', () => {
    open({ selection: selection(), isSelectable: (p) => p.id !== 'b' });

    expect(screen.queryByRole('checkbox', { name: 'Select Bayo Ade' })).toBeNull();
    expect(screen.getByRole('checkbox', { name: 'Select Ada Obi' })).toBeInTheDocument();
  });

  it('has no boxes unless it is given a selection', () => {
    open();

    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('asks for the next sort when a sortable header is pressed', () => {
    const onSortChange = vi.fn();

    open({ onSortChange, sort: { columnId: 'name', direction: 'asc' } });
    const header = screen.getByRole('button', { name: 'Name' });

    expect(header).toHaveAttribute('aria-sort', 'ascending');
    fireEvent.click(header);
    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'desc' });
  });

  it('leaves a header that is not sortable as plain text', () => {
    open({ onSortChange: vi.fn() });

    expect(screen.queryByRole('button', { name: 'Role' })).toBeNull();
  });

  it('links the whole row body through the app’s link, or runs a click', () => {
    const onRowClick = vi.fn();
    const { unmount } = open({ rowHref: (p) => `/staff/${p.id}` });

    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/staff/a');
    unmount();
    open({ onRowClick });
    fireEvent.click(screen.getAllByRole('button', { name: /Ada Obi/ })[0]);
    expect(onRowClick).toHaveBeenCalledWith(people[0]);
  });

  it('adds a menu per row, and none for a row with no items', () => {
    open({
      rowMenu: (p) => (p.id === 'a' ? [{ label: 'Edit', onSelect: vi.fn() }] : []),
    });

    expect(screen.getByRole('button', { name: 'More for Ada Obi' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'More for Bayo Ade' })).toBeNull();
  });

  it('sets the row height and per-row classes', () => {
    open({ density: 'compact', rowClassName: (p) => (p.id === 'b' ? 'bg-muted' : undefined) });
    const rows = screen.getAllByRole('listitem');

    expect(rows[0].className).toContain('min-h-[52px]');
    expect(rows[1].className).toContain('bg-muted');
    expect(rows[0].className).not.toContain('bg-muted');
  });

  it('shows what it is given when there are no rows, and the footer always', () => {
    open({ rows: [], empty: <p>No staff yet</p>, footer: <p>Pager here</p> });

    expect(screen.getByText('No staff yet')).toBeInTheDocument();
    expect(screen.getByText('Pager here')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).toBeNull();
  });

  it('shows a loading state instead of rows', () => {
    open({ isLoading: true });

    expect(screen.queryByText('Ada Obi')).toBeNull();
  });

  it('reads in the app’s language', () => {
    render(
      <LernicleUIProvider language="fr">
        <DataTable columns={columns} label="Personnel" rowKey={(p) => p.id} rowName={(p) => p.name} rows={people} selection={selection()} />
      </LernicleUIProvider>,
    );

    expect(screen.getByRole('checkbox', { name: 'Sélectionner Ada Obi' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Tout sélectionner' })).toBeInTheDocument();
  });
});
