import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

import { PickerNavButton } from '../PickerNavButton';
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
  firstDayOfWeek,
  formatDayNumber,
  formatIsoDayLong,
  formatIsoMonth,
  monthCells,
  parseIsoDay,
  shiftMonth,
  shortWeekdayNames,
  toIsoMonth,
} from '../../../format/calendarGrid';

/** The centred month grid behind every date field. */
export function CalendarPopup({
  title,
  value,
  min,
  max,
  onPick,
  onClose,
}: {
  title: string;
  value: string;
  min?: string;
  max?: string;
  onPick: (iso: string) => void;
  onClose: () => void;
}) {
  const { t } = useUIText();
  const { locale, timeZone } = useUIFormat();
  const today = schoolDay(new Date(), timeZone);
  const start = parseIsoDay(value) ?? parseIsoDay(today)!;
  const [view, setView] = useState({ year: start.year, month: start.month });
  const weekStart = firstDayOfWeek(locale);
  const cells = monthCells(view.year, view.month, weekStart);
  const weekdays = useMemo(
    () => shortWeekdayNames(locale, weekStart),
    [locale, weekStart],
  );
  const allowed = (iso: string) => (!min || iso >= min) && (!max || iso <= max);
  const move = (by: number) =>
    setView((now) => shiftMonth(now.year, now.month, by));

  return (
    <ModalShell open size="sm" title={title} onOpenChange={onClose}>
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <PickerNavButton
          icon={CaretDoubleLeft}
          label={t('ui.date.prevYear')}
          onClick={() => move(-12)}
        />
        <PickerNavButton
          icon={CaretLeft}
          label={t('ui.date.prevMonth')}
          onClick={() => move(-1)}
        />
        <strong
          aria-live="polite"
          className="min-w-0 flex-1 text-center font-brief-display text-base font-bold leading-5"
        >
          {formatIsoMonth(toIsoMonth(view.year, view.month), locale)}
        </strong>
        <PickerNavButton
          icon={CaretRight}
          label={t('ui.date.nextMonth')}
          onClick={() => move(1)}
        />
        <PickerNavButton
          icon={CaretDoubleRight}
          label={t('ui.date.nextYear')}
          onClick={() => move(12)}
        />
      </div>
      <div
        aria-hidden
        className="grid grid-cols-7 text-center text-sm leading-5 text-muted-foreground"
      >
        {weekdays.map((day) => (
          <span key={day} className="py-1.5">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((iso, index) =>
          iso ? (
            <button
              key={iso}
              aria-current={iso === today ? 'date' : undefined}
              aria-label={formatIsoDayLong(iso, locale)}
              aria-pressed={iso === value}
              className={cn(
                'h-11 rounded-xl border border-transparent text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-muted-foreground/50',
                iso === value
                  ? 'bg-primary font-bold text-primary-foreground'
                  : 'hover:bg-muted',
                iso === today && iso !== value && 'border-primary',
              )}
              disabled={!allowed(iso)}
              type="button"
              onClick={() => onPick(iso)}
            >
              {formatDayNumber(iso, locale)}
            </button>
          ) : (
            <span key={`blank-${index}`} aria-hidden />
          ),
        )}
      </div>
      <div className={dialogActionsClass}>
        <Button
          className={secondaryButtonClass}
          disabled={!allowed(today)}
          type="button"
          variant="ghost"
          onClick={() => onPick(today)}
        >
          {t('ui.date.today')}
        </Button>
      </div>
    </ModalShell>
  );
}
