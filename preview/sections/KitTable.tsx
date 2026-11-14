import { useMemo, useState } from 'react';

import {
  DataTable,
  eyebrowClass,
  Pager,
  StatusPill,
  StatePanel,
  type DataTableColumn,
  type DataTableSort,
} from '../../src';
import { useRowSelection } from '../../src/lists';

interface Person {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Invited';
  code: string;
  joined: string;
  email: string;
}

const PEOPLE: Person[] = [
  ['Ada Obi', 'Head teacher', 'Active', 'EMP-001', '3 Sep 2024', 'ada@school.org'],
  ['Bayo Adeyemi', 'Bursar', 'Active', 'EMP-002', '12 Jan 2025', 'bayo@school.org'],
  ['Chidi Eze', 'Class teacher', 'Invited', '', '8 Nov 2026', 'chidi@school.org'],
  ['Dara Lawal', 'Class teacher', 'Active', 'EMP-004', '1 Sep 2025', 'dara@school.org'],
  ['Efe Musa', 'Librarian', 'Active', 'EMP-005', '20 Feb 2026', 'efe@school.org'],
].map(([name, role, status, code, joined, email], i) => ({
  id: String(i), name, role, status, code, joined, email,
})) as Person[];

const toggleClass = 'inline-flex items-center gap-2 text-sm';

export function KitTable() {
  const selection = useRowSelection();
  const [ticks, setTicks] = useState(true);
  const [menu, setMenu] = useState(true);
  const [link, setLink] = useState(false);
  const [compact, setCompact] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [sort, setSort] = useState<DataTableSort>({ columnId: 'name', direction: 'asc' });

  const columns: DataTableColumn<Person>[] = useMemo(
    () => [
      {
        id: 'name',
        header: 'Name',
        main: true,
        sortable: true,
        cell: (p) => p.name,
        secondary: (p) => ({ narrow: p.role, medium: p.code || p.joined, wide: p.email }),
      },
      { id: 'role', header: 'Role', from: 'tablet', sortable: true, cell: (p) => p.role },
      {
        id: 'status',
        header: 'Status',
        from: 'tablet',
        cell: (p) => <StatusPill label={p.status} tone={p.status === 'Active' ? 'good' : 'warning'} />,
      },
      { id: 'code', header: 'Employee ID', from: 'wide', width: 'w-24', muted: true, cell: (p) => p.code },
      { id: 'joined', header: 'Joined', from: 'wide', width: 'w-28', muted: true, cell: (p) => p.joined },
    ],
    [],
  );

  const rows = useMemo(() => {
    const key = sort.columnId as keyof Person;
    const sorted = [...PEOPLE].sort((a, b) => String(a[key]).localeCompare(String(b[key])));

    return sort.direction === 'asc' ? sorted : sorted.reverse();
  }, [sort]);

  return (
    <section className="flex flex-col gap-3">
      <p className={eyebrowClass}>Data table, every option is a prop</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {[
          ['Tick boxes', ticks, setTicks],
          ['Row menu', menu, setMenu],
          ['Row is a link', link, setLink],
          ['Compact rows', compact, setCompact],
          ['No rows', empty, setEmpty],
        ].map(([label, value, set]) => (
          <label key={label as string} className={toggleClass}>
            <input
              checked={value as boolean}
              type="checkbox"
              onChange={(e) => (set as (v: boolean) => void)(e.target.checked)}
            />
            {label as string}
          </label>
        ))}
      </div>
      <DataTable
        columns={columns}
        density={compact ? 'compact' : 'comfortable'}
        empty={<StatePanel body="Add your staff. You can then set up their pay here." title="No staff yet" />}
        footer={<Pager page={1} pageSize={20} setPage={() => {}} total={empty ? 0 : rows.length} totalPages={2} />}
        isSelectable={(p) => p.status === 'Active'}
        label="Staff"
        rowHref={link ? (p) => `#staff-${p.id}` : undefined}
        rowKey={(p) => p.id}
        rowMenu={menu ? () => [{ label: 'View profile', onSelect: () => {} }, { label: 'Remove', danger: true, onSelect: () => {} }] : undefined}
        rowName={(p) => p.name}
        rows={empty ? [] : rows}
        selection={ticks ? selection : undefined}
        sort={sort}
        onSortChange={setSort}
      />
    </section>
  );
}
