import type { MonthFieldProps } from '../DateFields.types';

import { CalendarDots, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

import { PickerNavButton } from '../PickerNavButton';
import { PickerTrigger } from '../PickerTrigger';
import { ModalShell } from '../../ModalShell';
import {
  dialogActionsClass,
  secondaryButtonClass,
} from '../../../styles/formStyles';
import { Button } from '../../../primitives/button';
import { schoolDay } from '../../../format/schoolDay';
import { useUIFormat } from '../../../provider/LernicleUIProvider';
import { useUIText } from '../../../provider/LernicleUIProvider';
import { cn } from '../../../lib/cn';
import {
  formatIsoMonth,
  formatYear,
  parseIsoDay,
  shortMonthNames,
  toIsoMonth,
} from '../../../format/calendarGrid';

/** A month, picked in a centred year grid. Value is `YYYY-MM`. */
export function MonthField({
  value,
  onChange,
  min,
  max,
  placeholder,
  ...field
}: MonthFieldProps) {
  const { t } = useUIText();
  const { locale, timeZone } = useUIFormat();
  const [open, setOpen] = useState(false);
  const thisMonth = schoolDay(new Date(), timeZone).slice(0, 7);
  const [year, setYear] = useState(0);
  const names = useMemo(() => shortMonthNames(locale), [locale]);
  const allowed = (key: string) => (!min || key >= min) && (!max || key <= max);
  const pick = (key: string) => {
    onChange(key);
    setOpen(false);
  };

  return (
    <>
      <PickerTrigger
        {...field}
        chosen={Boolean(value)}
        icon={CalendarDots}
        text={
          value
            ? formatIsoMonth(value, locale)
            : (placeholder ?? t('ui.date.chooseMonth'))
        }
        onOpen={() => {
          setYear(parseIsoDay(value || thisMonth)!.year);
          setOpen(true);
        }}
      />
      {open && (
        <ModalShell open size="sm" title={field.label} onOpenChange={setOpen}>
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <PickerNavButton
              icon={CaretLeft}
              label={t('ui.date.prevYear')}
              onClick={() => setYear(year - 1)}
            />
            <strong
              aria-live="polite"
              className="font-brief-display text-[17px] font-bold"
            >
              {formatYear(year, locale)}
            </strong>
            <PickerNavButton
              icon={CaretRight}
              label={t('ui.date.nextYear')}
              onClick={() => setYear(year + 1)}
            />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {names.map((name, month) => {
              const key = toIsoMonth(year, month);
              const on = key === value;

              return (
                <button
                  key={key}
                  aria-label={formatIsoMonth(key, locale)}
                  aria-pressed={on}
                  className={cn(
                    'h-12 rounded-xl border border-transparent text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-muted-foreground/50',
                    on
                      ? 'bg-primary font-bold text-primary-foreground'
                      : 'hover:bg-muted',
                    key === thisMonth && !on && 'border-primary',
                  )}
                  disabled={!allowed(key)}
                  type="button"
                  onClick={() => pick(key)}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div className={dialogActionsClass}>
            <Button
              className={secondaryButtonClass}
              disabled={!allowed(thisMonth)}
              type="button"
              variant="ghost"
              onClick={() => pick(thisMonth)}
            >
              {t('ui.date.thisMonth')}
            </Button>
          </div>
        </ModalShell>
      )}
    </>
  );
}
