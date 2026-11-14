import type {
  ColumnFrom,
  DataTableColumn,
  DataTableProps,
  DataTableSort,
} from './DataTable.types';

import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { Checkbox } from '../../primitives/checkbox';
import { cn } from '../../lib/cn';
import { useUI, useUIText } from '../../provider/LernicleUIProvider';
import { rowCheckboxClass } from '../../styles/formStyles';
import { ListSkeleton } from '../PageStates';
import { RowMenu } from '../RowMenu';

// The list answers to its own width, so it is right beside a sidebar too.
// Under 600px there are no columns; from 600px the `tablet` columns; from
// 800px the `wide` ones as well. These are fixed strings so Tailwind finds them.
const CONTAINER = '[container-type:inline-size]';
const HEADER = 'hidden [@container(min-width:600px)]:flex';
const FROM: Record<ColumnFrom | 'always', string> = {
  always: 'block',
  tablet: 'hidden [@container(min-width:600px)]:block',
  wide: 'hidden [@container(min-width:800px)]:block',
};
const NARROW = 'block truncate [@container(min-width:600px)]:hidden';
const MEDIUM =
  'hidden truncate [@container(min-width:600px)]:block [@container(min-width:800px)]:hidden';
const WIDE = 'hidden truncate [@container(min-width:800px)]:block';
const DENSITY = { comfortable: 'min-h-[68px]', compact: 'min-h-[52px]' };
const DEFAULT_WIDTH = 'w-[120px]';

function mainColumnOf<Row>(columns: DataTableColumn<Row>[]) {
  return columns.find((column) => column.main) ?? columns[0];
}

function SortHeader<Row>({
  column,
  sort,
  onSortChange,
}: {
  column: DataTableColumn<Row>;
  sort?: DataTableSort;
  onSortChange?: (sort: DataTableSort) => void;
}) {
  const active = sort?.columnId === column.id;
  const direction = active ? sort.direction : undefined;
  const Arrow = direction === 'desc' ? ArrowDown : ArrowUp;

  if (!column.sortable || !onSortChange) return <>{column.header}</>;

  return (
    <button
      aria-sort={
        direction === 'asc'
          ? 'ascending'
          : direction === 'desc'
            ? 'descending'
            : 'none'
      }
      className="inline-flex min-h-11 items-center gap-1 rounded-md font-semibold hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      type="button"
      onClick={() =>
        onSortChange({
          columnId: column.id,
          direction: direction === 'asc' ? 'desc' : 'asc',
        })
      }
    >
      {column.header}
      <Arrow
        aria-hidden="true"
        className={cn('size-3.5', !active && 'opacity-30')}
        weight="bold"
      />
    </button>
  );
}

/**
 * A list of rows with columns, as the redesigned screens draw them: a header
 * that appears when there is room, tick boxes, a name with details under it,
 * columns that arrive as the list widens, and a "…" menu at the end.
 *
 * Everything is a prop: which columns, from what width they show, what is
 * sortable, whether rows can be ticked, link or click, menu items, row height
 * and a tint per row. It fetches and pages nothing; put a `Pager` in `footer`.
 */
export function DataTable<Row>({
  label,
  rows,
  rowKey,
  columns,
  selection,
  selectAllLabel,
  isSelectable = () => true,
  rowName,
  rowMenu,
  rowHref,
  onRowClick,
  sort,
  onSortChange,
  density = 'comfortable',
  rowClassName,
  isLoading,
  empty,
  footer,
  className,
}: DataTableProps<Row>) {
  const { t } = useUIText();
  const { Link } = useUI();
  const main = mainColumnOf(columns);
  const others = columns.filter((column) => column !== main);
  const selectableIds = selection
    ? rows.filter(isSelectable).map(rowKey)
    : [];
  const allTicked =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selection?.ids.has(id));
  const hasMenu = Boolean(rowMenu);

  const body = (row: Row): ReactNode => {
    const secondary = main.secondary?.(row);

    return (
      <>
        <span className="min-w-0 flex-1">
          <span className="block min-w-0 truncate font-semibold">
            {main.cell(row)}
          </span>
          {secondary && (
            <span className="block text-sm leading-5 text-muted-foreground">
              {secondary.narrow !== undefined && (
                <span className={NARROW}>{secondary.narrow}</span>
              )}
              {secondary.medium !== undefined && (
                <span className={MEDIUM}>{secondary.medium}</span>
              )}
              {secondary.wide !== undefined && (
                <span className={WIDE}>{secondary.wide}</span>
              )}
            </span>
          )}
        </span>
        {others.map((column) => (
          <span
            key={column.id}
            className={cn(
              FROM[column.from ?? 'always'],
              column.width ?? DEFAULT_WIDTH,
              'flex-none truncate',
              column.muted && 'text-muted-foreground',
            )}
          >
            {column.cell(row)}
          </span>
        ))}
      </>
    );
  };

  const bodyClass = 'flex min-w-0 flex-1 items-center gap-3 sm:gap-4';

  return (
    <section aria-label={label} className={cn(CONTAINER, className)}>
      <div
        className={cn(
          HEADER,
          'items-center gap-3 px-2 pb-2 text-sm leading-5 text-muted-foreground sm:gap-4',
        )}
      >
        {selection ? (
          <Checkbox
            aria-label={selectAllLabel ?? t('ui.table.selectAll')}
            checked={allTicked}
            className={rowCheckboxClass}
            disabled={selectableIds.length === 0}
            onCheckedChange={() => selection.setPage(selectableIds, !allTicked)}
          />
        ) : null}
        <span className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <span className="min-w-0 flex-1">
            <SortHeader
              column={main}
              sort={sort}
              onSortChange={onSortChange}
            />
          </span>
          {others.map((column) => (
            <span
              key={column.id}
              className={cn(
                FROM[column.from ?? 'always'],
                column.width ?? DEFAULT_WIDTH,
                'flex-none truncate',
              )}
            >
              <SortHeader
                column={column}
                sort={sort}
                onSortChange={onSortChange}
              />
            </span>
          ))}
        </span>
        {hasMenu && <span className="w-11 flex-none" />}
      </div>

      {isLoading ? (
        <ListSkeleton />
      ) : rows.length === 0 ? (
        (empty ?? null)
      ) : (
        <ul className="m-0 list-none p-0">
          {rows.map((row) => {
            const id = rowKey(row);
            const name = rowName?.(row) ?? '';
            const href = rowHref?.(row);
            const items = rowMenu?.(row) ?? [];

            return (
              <li
                key={id}
                className={cn(
                  DENSITY[density],
                  'flex items-center gap-3 border-t border-border p-2 sm:gap-4',
                  rowClassName?.(row),
                )}
              >
                {selection &&
                  (isSelectable(row) ? (
                    <Checkbox
                      aria-label={t('ui.table.selectRow', { name })}
                      checked={selection.ids.has(id)}
                      className={rowCheckboxClass}
                      onCheckedChange={() => selection.toggle(id)}
                    />
                  ) : (
                    <span aria-hidden="true" className="w-5 flex-none" />
                  ))}
                {href ? (
                  <Link className={cn(bodyClass, 'no-underline')} href={href}>
                    {body(row)}
                  </Link>
                ) : onRowClick ? (
                  <button
                    className={cn(bodyClass, 'text-start')}
                    type="button"
                    onClick={() => onRowClick(row)}
                  >
                    {body(row)}
                  </button>
                ) : (
                  <div className={bodyClass}>{body(row)}</div>
                )}
                {hasMenu &&
                  (items.length > 0 ? (
                    <RowMenu
                      items={items}
                      label={t('ui.table.moreFor', { name })}
                    />
                  ) : (
                    <span aria-hidden="true" className="w-11 flex-none" />
                  ))}
              </li>
            );
          })}
        </ul>
      )}
      {footer}
    </section>
  );
}

export type {
  ColumnFrom,
  DataTableColumn,
  DataTableProps,
  DataTableSelection,
  DataTableSort,
  SecondaryText,
  SortDirection,
} from './DataTable.types';
