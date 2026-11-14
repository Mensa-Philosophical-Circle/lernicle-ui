import type { ReactNode } from 'react';

import type { RowMenuItem } from '../RowMenu';

/**
 * From which width of the list itself (not the screen) a column shows:
 * `tablet` from 600px, `wide` from 800px. Without it the column always shows.
 * The list answers to its own width, so it works beside a sidebar too.
 */
export type ColumnFrom = 'tablet' | 'wide';

/** Words under the main cell that change as the list grows. */
export interface SecondaryText {
  /** Under 600px wide. */
  narrow?: ReactNode;
  /** From 600px to 800px. */
  medium?: ReactNode;
  /** From 800px. */
  wide?: ReactNode;
}

export interface DataTableColumn<Row> {
  id: string;
  header: ReactNode;
  /** What the row shows in this column. */
  cell: (row: Row) => ReactNode;
  /**
   * The one column that holds the row's name and always shows. Give it
   * `secondary` to show details under it when the other columns are hidden.
   * Only the first `main` column counts; without one, the first column is it.
   */
  main?: boolean;
  secondary?: (row: Row) => SecondaryText;
  /** Where the column starts showing. Leave out to always show. */
  from?: ColumnFrom;
  /** A Tailwind width class, such as `w-32`. Default `w-[120px]`. Ignored for the main column. */
  width?: string;
  /** Muted text, as the later columns usually are. */
  muted?: boolean;
  /** Shows a sort button in the header. */
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface DataTableSort {
  columnId: string;
  direction: SortDirection;
}

/** The ticked rows, as `useRowSelection()` returns them. */
export interface DataTableSelection {
  ids: ReadonlySet<string>;
  toggle: (id: string) => void;
  setPage: (ids: string[], ticked: boolean) => void;
}

export interface DataTableProps<Row> {
  /** Names the list for screen readers. */
  label: string;
  rows: Row[];
  /** A stable id per row. */
  rowKey: (row: Row) => string;
  columns: DataTableColumn<Row>[];

  /** Tick boxes. Give `selectAllLabel`; rows are named by `rowName`. */
  selection?: DataTableSelection;
  selectAllLabel?: string;
  /** A row that cannot be ticked, such as a pending invite, shows no box. */
  isSelectable?: (row: Row) => boolean;
  /** The name a screen reader says for a row: "Select Ada", "More for Ada". */
  rowName?: (row: Row) => string;

  /** The "…" menu at the end of a row. Return nothing to leave a row without one. */
  rowMenu?: (row: Row) => RowMenuItem[];

  /** The whole row body goes to this page, through the app's link. */
  rowHref?: (row: Row) => string | undefined;
  /** Or runs this when the row body is pressed. `rowHref` wins. */
  onRowClick?: (row: Row) => void;

  sort?: DataTableSort;
  onSortChange?: (sort: DataTableSort) => void;

  /** Taller rows for two lines of text (`comfortable`, the default), or one (`compact`). */
  density?: 'comfortable' | 'compact';
  /** Extra classes for a row, such as a tint for one that needs attention. */
  rowClassName?: (row: Row) => string | undefined;

  isLoading?: boolean;
  /** Shown instead of the rows when there are none. */
  empty?: ReactNode;
  /** Under the rows, such as the `Pager`. */
  footer?: ReactNode;
  className?: string;
}
