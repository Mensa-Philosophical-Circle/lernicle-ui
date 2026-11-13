import type { PagerProps } from './Pager.types';

import { useId } from 'react';

import { SearchableSelect } from '../SearchableSelect';
import { useUIText } from '../../provider/LernicleUIProvider';
import { pageRange } from '../../lists/pagedEnvelope';

const PAGER_BUTTON =
  'min-h-11 px-3.5 font-semibold text-primary disabled:cursor-not-allowed disabled:text-muted-foreground/60';

/** "21 to 40 of 95" with Previous and Next. Hidden when one page holds everything. */
export function Pager({
  page,
  pageSize,
  total,
  totalPages,
  setPage,
  pageSizes,
  setPageSize,
}: PagerProps) {
  const { t } = useUIText();
  const sizeId = useId();
  const { from, to } = pageRange({ page, pageSize, total });
  const canSize = Boolean(pageSizes && setPageSize);

  if (totalPages <= 1 && !canSize) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-1.5">
      <div className="flex items-center gap-3.5 text-sm leading-5 text-muted-foreground">
        <span aria-live="polite">{t('ui.list.range', { from, to, total })}</span>
        {canSize && (
          <>
            <label className="sr-only" htmlFor={sizeId}>
              {t('ui.list.perPage')}
            </label>
            <SearchableSelect
              className="h-11 w-auto gap-2 ps-3"
              id={sizeId}
              options={pageSizes!.map((count) => ({
                label: t('ui.list.perPageOption', { count }),
                value: String(count),
              }))}
              searchable={false}
              value={String(pageSize)}
              onChange={(value) => {
                setPageSize!(Number(value));
                setPage(1);
              }}
            />
          </>
        )}
      </div>
      <div className="flex gap-1">
        <button
          aria-label={t('ui.list.previous')}
          className={PAGER_BUTTON}
          disabled={page <= 1}
          type="button"
          onClick={() => setPage(page - 1)}
        >
          {t('ui.list.previous')}
        </button>
        <button
          aria-label={t('ui.list.next')}
          className={PAGER_BUTTON}
          disabled={page >= totalPages}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          {t('ui.list.next')}
        </button>
      </div>
    </div>
  );
}
