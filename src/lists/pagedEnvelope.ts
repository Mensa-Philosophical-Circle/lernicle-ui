/** What every list screen needs from one page of an API reply. */
export interface PagedResult<TRow> {
  rows: TRow[];
  /** Everything matching the search and filters, across all pages. */
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  nextCursor: string | null;
  /** The reply's paging block, for extras such as `overall` totals. */
  meta: Record<string, unknown>;
}

export interface PagedRequest {
  page: number;
  pageSize: number;
}

type Loose = Record<string, unknown>;

const isObject = (value: unknown): value is Loose =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const firstNumber = (...values: unknown[]): number | undefined =>
  values.find(
    (value): value is number =>
      typeof value === 'number' && Number.isFinite(value),
  );

/** An axios response carries the envelope in `data`, next to status and headers. */
function envelopeOf(reply: unknown): unknown {
  return isObject(reply) && 'headers' in reply && 'config' in reply
    ? reply.data
    : reply;
}

function rowsOf<TRow>(envelope: unknown): TRow[] {
  if (Array.isArray(envelope)) return envelope as TRow[];
  if (!isObject(envelope)) return [];

  const { data } = envelope;

  if (Array.isArray(data)) return data as TRow[];
  if (!isObject(data)) return [];

  const list = [data.data, data.items, data.rows, data.results].find(
    Array.isArray,
  );

  return (list ?? []) as TRow[];
}

/**
 * Paging info is at `metadata.meta` or spread into `metadata`. A few older
 * endpoints put it beside the rows, so those places are read last.
 */
function metaOf(envelope: unknown): Loose {
  if (!isObject(envelope)) return {};

  const { metadata, data, meta } = envelope;
  const blocks: unknown[] = [
    isObject(data) ? data.meta : undefined,
    meta,
    metadata,
    isObject(metadata) ? metadata.meta : undefined,
  ];

  return Object.assign({}, ...blocks.filter(isObject)) as Loose;
}

/**
 * The one way to read a list reply. The page size is the one that was asked
 * for: the API's `size` can mean the rows on this page, so it is not trusted.
 */
export function readPagedEnvelope<TRow>(
  reply: unknown,
  { page, pageSize }: PagedRequest,
): PagedResult<TRow> {
  const envelope = envelopeOf(reply);
  const rows = rowsOf<TRow>(envelope);
  const meta = metaOf(envelope);
  const total =
    firstNumber(meta.total, meta.totalItems, meta.totalCount, meta.count) ??
    (page - 1) * pageSize + rows.length;
  const totalPages =
    firstNumber(meta.totalPages, meta.lastPage, meta.pages) ??
    Math.ceil(total / pageSize);
  const cursor = meta.nextCursor;

  return {
    rows,
    total,
    totalPages: Math.max(totalPages, 1),
    page,
    pageSize,
    nextCursor: typeof cursor === 'string' ? cursor : null,
    meta,
  };
}

/** "21 to 40 of 95": the first and last row a page shows. */
export function pageRange({
  page,
  pageSize,
  total,
}: Pick<PagedResult<unknown>, 'page' | 'pageSize' | 'total'>) {
  if (total === 0) return { from: 0, to: 0 };

  return {
    from: (page - 1) * pageSize + 1,
    to: Math.min(page * pageSize, total),
  };
}
