import { useCallback, useMemo, useState } from 'react';

/** Ticked rows of a list. Ticks survive paging and filtering until cleared. */
export function useRowSelection() {
  const [ids, setIds] = useState<ReadonlySet<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = new Set(current);

      if (!next.delete(id)) next.add(id);

      return next;
    });
  }, []);

  const setPage = useCallback((pageIds: string[], ticked: boolean) => {
    setIds((current) => {
      const next = new Set(current);

      for (const id of pageIds) {
        if (ticked) next.add(id);
        else next.delete(id);
      }

      return next;
    });
  }, []);

  const clear = useCallback(() => setIds(new Set()), []);

  return useMemo(
    () => ({ ids, list: Array.from(ids), toggle, setPage, clear }),
    [ids, toggle, setPage, clear],
  );
}

export type RowSelection = ReturnType<typeof useRowSelection>;
