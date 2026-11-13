import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLocalList } from './useLocalList';

const names = Array.from({ length: 45 }, (_, i) => `Pupil ${i + 1}`);
const list = (rows = names) =>
  renderHook(({ all }) => useLocalList(all, (row) => row), {
    initialProps: { all: rows },
  });

describe('useLocalList', () => {
  it('shows 20 a page and counts every row', () => {
    const { result } = list();

    expect(result.current.rows).toHaveLength(20);
    expect(result.current.total).toBe(45);
    expect(result.current.totalPages).toBe(3);
    act(() => result.current.setPage(3));
    expect(result.current.rows).toHaveLength(5);
  });

  it('searches every page and goes back to the first', () => {
    const { result } = list();

    act(() => result.current.setPage(3));
    act(() => result.current.setSearch(' pupil 45 '));
    expect(result.current.page).toBe(1);
    expect(result.current.rows).toEqual(['Pupil 45']);
  });

  it('tells no match from an empty list', () => {
    const { result } = list();

    act(() => result.current.setSearch('nobody'));
    expect(result.current.noMatches).toBe(true);
    expect(result.current.isEmpty).toBe(false);
    expect(list([]).result.current.isEmpty).toBe(true);
  });

  it('stays on a real page when rows leave', () => {
    const { result, rerender } = list();

    act(() => result.current.setPage(3));
    rerender({ all: names.slice(0, 10) });
    expect(result.current.page).toBe(1);
  });
});
