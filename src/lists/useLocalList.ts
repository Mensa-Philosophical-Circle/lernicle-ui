import { useCallback, useMemo, useState } from 'react';

/**
 * Search and paging for a list that arrives whole, such as the pupils of one
 * class. Lists the server pages go through usePagedList. Spreads into Pager.
 */
export function useLocalList<TRow>(
  all: TRow[],
  textOf: (row: TRow) => string,
  pageSize = 20,
) {
  const [wanted, setWanted] = useState(1);
  const [search, setSearchState] = useState('');
  const query = search.trim().toLocaleLowerCase();
  const matching = useMemo(
    () =>
      query
        ? all.filter((row) => textOf(row).toLocaleLowerCase().includes(query))
        : all,
    // Only the rows and the words decide this, so an inline `textOf` is fine.

    [all, query],
  );
  const total = matching.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  // Rows can leave while someone is on the last page.
  const page = Math.min(wanted, totalPages);
  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setWanted(1);
  }, []);

  return {
    rows: matching.slice((page - 1) * pageSize, page * pageSize),
    total,
    totalPages,
    page,
    pageSize,
    setPage: setWanted,
    search,
    setSearch,
    isEmpty: all.length === 0,
    noMatches: total === 0 && all.length > 0,
  };
}
