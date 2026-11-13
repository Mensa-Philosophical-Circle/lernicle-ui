/**
 * Rows respond to the list's own width. Under 600px the sub-line carries the
 * detail and time left; from 600px the time left gets its column and the
 * sub-line the deleted date; from 800px every column shows.
 */
const FULL_COLUMN =
  'hidden flex-none truncate [@container(min-width:800px)]:block';

export const HEADER_ROW = 'hidden [@container(min-width:800px)]:flex';
export const DETAIL_COLUMN = `${FULL_COLUMN} w-[120px]`;
export const DATE_COLUMN = `${FULL_COLUMN} w-[100px]`;
export const BY_COLUMN = `${FULL_COLUMN} w-[120px]`;
export const LEFT_COLUMN =
  'hidden w-[76px] flex-none [@container(min-width:600px)]:block';

export const SUB_PHONE = 'block truncate [@container(min-width:600px)]:hidden';
export const SUB_TABLET =
  'hidden truncate [@container(min-width:600px)]:block [@container(min-width:800px)]:hidden';
export const SUB_FULL = 'hidden truncate [@container(min-width:800px)]:block';

export const RESTORE_BUTTON =
  'min-h-11 w-[92px] flex-none whitespace-nowrap rounded-xl border border-border bg-card font-semibold text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
