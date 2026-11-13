import { describe, expect, it } from 'vitest';

import { pageRange, readPagedEnvelope } from './pagedEnvelope';

const request = { page: 2, pageSize: 20 };

describe('readPagedEnvelope', () => {
  it('reads paging from metadata.meta', () => {
    const result = readPagedEnvelope(
      {
        data: [{ id: 'a' }],
        metadata: {
          timestamp: 1,
          meta: { total: 45, size: 1, nextCursor: 'c1', overall: { paid: 3 } },
        },
      },
      request,
    );

    expect(result.rows).toEqual([{ id: 'a' }]);
    expect(result.total).toBe(45);
    expect(result.totalPages).toBe(3);
    expect(result.nextCursor).toBe('c1');
    expect(result.meta.overall).toEqual({ paid: 3 });
  });

  it('reads paging spread into metadata', () => {
    const result = readPagedEnvelope(
      { data: [], metadata: { total: 8, totalPages: 4 } },
      request,
    );

    expect(result.total).toBe(8);
    expect(result.totalPages).toBe(4);
  });

  it('prefers lastPage when the API sends it', () => {
    expect(
      readPagedEnvelope({ data: [], metadata: { total: 8, lastPage: 7 } }, request)
        .totalPages,
    ).toBe(7);
  });

  it('unwraps an axios response', () => {
    const result = readPagedEnvelope(
      {
        headers: {},
        config: {},
        data: { data: [1, 2], metadata: { meta: { total: 2 } } },
      },
      { page: 1, pageSize: 20 },
    );

    expect(result.rows).toEqual([1, 2]);
    expect(result.total).toBe(2);
  });

  it('finds rows and paging nested inside data', () => {
    const result = readPagedEnvelope(
      { data: { items: ['x'], meta: { totalItems: 21 } } },
      { page: 1, pageSize: 20 },
    );

    expect(result.rows).toEqual(['x']);
    expect(result.totalPages).toBe(2);
  });

  it('does not take the size of this page for the page size', () => {
    const result = readPagedEnvelope(
      { data: [1], metadata: { meta: { total: 41, size: 1 } } },
      { page: 3, pageSize: 20 },
    );

    expect(result.pageSize).toBe(20);
    expect(result.totalPages).toBe(3);
  });

  it('works out a total from the rows when the API sends none', () => {
    expect(readPagedEnvelope({ data: [1, 2] }, request).total).toBe(22);
  });

  it('has one page and no rows for an empty or broken reply', () => {
    const result = readPagedEnvelope(undefined, { page: 1, pageSize: 20 });

    expect(result.rows).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(1);
  });
});

describe('pageRange', () => {
  it('gives the first and last row of a page', () => {
    expect(pageRange({ page: 2, pageSize: 20, total: 45 })).toEqual({
      from: 21,
      to: 40,
    });
  });

  it('stops at the total on the last page', () => {
    expect(pageRange({ page: 3, pageSize: 20, total: 45 })).toEqual({
      from: 41,
      to: 45,
    });
  });

  it('is zero when there is nothing', () => {
    expect(pageRange({ page: 1, pageSize: 20, total: 0 })).toEqual({
      from: 0,
      to: 0,
    });
  });
});
