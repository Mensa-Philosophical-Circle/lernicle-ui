import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '../lib/useDebounce';
import { readPagedEnvelope } from './pagedEnvelope';

export type PagedFilterValue = string | string[] | undefined;
export type PagedFilters = Record<string, PagedFilterValue>;

/** Sent to the API; empty filters and an empty search are left out. */
export type PagedListParams = {
  page: number;
  limit: number;
  search?: string;
} & Record<string, unknown>;

export interface UsePagedStateOptions<TFilters extends PagedFilters> {
  initialFilters?: TFilters;
  pageSize?: number;
  searchDelayMs?: number;
}

const isSet = (value: PagedFilterValue) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value);

function activeOnly(filters: PagedFilters): Record<string, string | string[]> {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => isSet(value)),
  ) as Record<string, string | string[]>;
}

/**
 * One list screen's search, filters and page, at 20 a page. Changing the
 * search or a filter goes back to page 1. It fetches nothing: the app passes
 * `params` to its own query and the reply to `usePagedResult`.
 */
export function usePagedState<TFilters extends PagedFilters = PagedFilters>({
  initialFilters = {} as TFilters,
  pageSize = 20,
  searchDelayMs = 300,
}: UsePagedStateOptions<TFilters> = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearchState] = useState('');
  const [filters, setFilters] = useState<TFilters>(initialFilters);
  const debouncedSearch = useDebounce(search.trim(), searchDelayMs);
  const active = useMemo(() => activeOnly(filters), [filters]);

  /** The search and filters without the page: what totals and exports cover. */
  const matching = useMemo(
    () => ({
      ...active,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
    }),
    [active, debouncedSearch],
  );

  const params: PagedListParams = useMemo(
    () => ({ page, limit: pageSize, ...matching }),
    [page, pageSize, matching],
  );

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPage(1);
  }, []);

  const setFilter = useCallback(
    <K extends keyof TFilters>(key: K, value: TFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }));
      setPage(1);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setSearchState('');
    setFilters(initialFilters);
    setPage(1);
    // Only the first value counts, so an inline `initialFilters` is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterCount = Object.keys(active).length;

  return {
    page,
    pageSize,
    setPage,
    search,
    setSearch,
    filters,
    setFilter,
    clearFilters,
    filterCount,
    isFiltering: filterCount > 0 || debouncedSearch.length > 0,
    matching,
    /** What to send to the API for this page. */
    params,
  };
}

export type PagedState<TFilters extends PagedFilters = PagedFilters> =
  ReturnType<typeof usePagedState<TFilters>>;

/**
 * Reads the API reply for the current page through the one envelope helper,
 * and goes back to the last page when rows were removed elsewhere.
 * `isPlaceholder` is true while the previous page is still showing.
 */
export function usePagedResult<TRow>(
  state: Pick<PagedState, 'page' | 'pageSize' | 'setPage' | 'isFiltering'>,
  reply: unknown,
  isPlaceholder = false,
) {
  const { page, pageSize, setPage, isFiltering } = state;
  const result = useMemo(
    () => readPagedEnvelope<TRow>(reply, { page, pageSize }),
    [reply, page, pageSize],
  );

  useEffect(() => {
    if (!isPlaceholder && reply && page > result.totalPages) {
      setPage(result.totalPages);
    }
  }, [page, result.totalPages, reply, isPlaceholder, setPage]);

  const hasLoaded = reply !== undefined;

  return {
    rows: result.rows,
    total: result.total,
    totalPages: result.totalPages,
    meta: result.meta,
    /** The school has none at all. */
    isEmpty: hasLoaded && result.total === 0 && !isFiltering,
    /** There are some, but not for this search or filter. */
    noMatches: hasLoaded && result.total === 0 && isFiltering,
  };
}
