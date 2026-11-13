import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePagedResult, usePagedState } from './usePagedState';

const reply = (total: number, rows: unknown[] = [{ id: 'a' }]) => ({
  data: rows,
  metadata: { meta: { total } },
});

describe('usePagedState', () => {
  it('asks for 20 a page and leaves out empty filters', () => {
    const { result } = renderHook(() =>
      usePagedState({ initialFilters: { status: undefined as string | undefined } }),
    );

    expect(result.current.params).toEqual({ page: 1, limit: 20 });
    expect(result.current.filterCount).toBe(0);
  });

  it('goes back to page 1 when a filter changes', () => {
    const { result } = renderHook(() =>
      usePagedState<{ status?: string; classIds?: string[] }>(),
    );

    act(() => result.current.setPage(3));
    act(() => result.current.setFilter('status', 'paid'));
    act(() => result.current.setFilter('classIds', []));

    expect(result.current.params).toEqual({ page: 1, limit: 20, status: 'paid' });
    expect(result.current.filterCount).toBe(1);
    expect(result.current.matching).toEqual({ status: 'paid' });
  });

  it('sends a trimmed search once typing stops, and clears everything together', async () => {
    const { result } = renderHook(() => usePagedState({ searchDelayMs: 10 }));

    act(() => result.current.setSearch('  ada '));
    await waitFor(() => expect(result.current.params.search).toBe('ada'));
    expect(result.current.isFiltering).toBe(true);

    act(() => result.current.clearFilters());
    await waitFor(() => expect(result.current.isFiltering).toBe(false));
    expect(result.current.search).toBe('');
  });
});

describe('usePagedResult', () => {
  it('reads the envelope and tells empty from no matches', () => {
    const state = { page: 1, pageSize: 20, setPage: () => {}, isFiltering: false };
    const { result, rerender } = renderHook(
      ({ data, filtering }) =>
        usePagedResult({ ...state, isFiltering: filtering }, data),
      { initialProps: { data: reply(45) as unknown, filtering: false } },
    );

    expect(result.current.rows).toHaveLength(1);
    expect(result.current.totalPages).toBe(3);

    rerender({ data: reply(0, []), filtering: false });
    expect(result.current.isEmpty).toBe(true);

    rerender({ data: reply(0, []), filtering: true });
    expect(result.current.isEmpty).toBe(false);
    expect(result.current.noMatches).toBe(true);
  });

  it('says nothing about emptiness before the first reply', () => {
    const { result } = renderHook(() =>
      usePagedResult({ page: 1, pageSize: 20, setPage: () => {}, isFiltering: false }, undefined),
    );

    expect(result.current.isEmpty).toBe(false);
    expect(result.current.noMatches).toBe(false);
  });

  it('moves to the last page when the current one disappears', async () => {
    const { result } = renderHook(() => {
      const state = usePagedState();
      const paged = usePagedResult(state, state.page === 3 ? reply(25) : reply(25));

      return { state, paged };
    });

    act(() => result.current.state.setPage(3));
    await waitFor(() => expect(result.current.state.page).toBe(2));
  });
});
