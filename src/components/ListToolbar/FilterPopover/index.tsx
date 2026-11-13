import type { FilterPopoverProps } from '../ListToolbar.types';

import { Funnel } from '@phosphor-icons/react';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../primitives/popover';
import { useUIText } from '../../../provider/LernicleUIProvider';

/** The Filter button and its pop-over. Put FormFields with selects inside. */
export function FilterPopover({
  count,
  matchText,
  onClear,
  doneLabel,
  resetLabel,
  width = 380,
  children,
}: FilterPopoverProps) {
  const { t, dir } = useUIText();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label={
            count > 0
              ? t('ui.list.filterCount', { count })
              : t('ui.list.filter')
          }
          className="inline-flex min-h-12 flex-none items-center gap-2 rounded-xl border border-border bg-card px-4 font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          type="button"
        >
          <Funnel aria-hidden size={20} weight="duotone" />
          {t('ui.list.filter')}
          {count > 0 && (
            <span
              aria-hidden
              className="grid h-[22px] min-w-[22px] place-items-center rounded-full bg-primary px-1.5 text-[13px] font-bold leading-4 text-primary-foreground"
            >
              {count}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        aria-label={t('ui.list.filterBy')}
        className="flex max-w-[calc(100vw-28px)] flex-col gap-3 rounded-[18px] border-border bg-popover p-4 font-brief-body text-[15px] leading-[22px] text-foreground shadow-none"
        dir={dir}
        sideOffset={8}
        style={{ width }}
      >
        <div className="flex items-center justify-between gap-2">
          <strong className="font-brief-display text-[17px] font-bold leading-[22px]">
            {t('ui.list.filterBy')}
          </strong>
          {matchText && (
            <span className="text-sm leading-5 text-muted-foreground">
              {matchText}
            </span>
          )}
        </div>
        {children}
        {doneLabel && (
          <div className="flex items-center justify-between gap-2">
            <button
              aria-label={resetLabel ?? t('ui.list.clear')}
              className="min-h-11 font-semibold text-muted-foreground hover:text-foreground"
              type="button"
              onClick={onClear}
            >
              {resetLabel ?? t('ui.list.clear')}
            </button>
            <button
              aria-label={doneLabel}
              className="min-h-11 rounded-xl px-3.5 font-bold text-primary"
              type="button"
              onClick={() => setOpen(false)}
            >
              {doneLabel}
            </button>
          </div>
        )}
        {!doneLabel && count > 0 && onClear && (
          <button
            aria-label={t('ui.list.clear')}
            className="min-h-11 self-start font-semibold text-primary"
            type="button"
            onClick={onClear}
          >
            {t('ui.list.clear')}
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
