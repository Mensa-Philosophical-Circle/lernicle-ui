import type { MoneyTotalsProps } from './MoneyTotals.types';

import { useUIFormat } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

/**
 * Shows money that may come from several currencies, one line per currency.
 * Different currencies are never added together. A total whose records carry
 * no currency shows as a bare number (or in the school's currency when the
 * school has set one), never with an invented symbol.
 */
export function MoneyTotals({
  totals,
  compact,
  display,
  emptyText,
  className,
}: MoneyTotalsProps) {
  const { money, compactMoney } = useUIFormat();
  const format = compact ? compactMoney : money;

  if (totals.length === 0) {
    return <span className={className}>{emptyText ?? format(0)}</span>;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {totals.map((entry) => (
        <span
          key={entry.currency ?? 'none'}
          data-currency={entry.currency ?? ''}
        >
          {format(
            entry.total,
            entry.currency,
            display ? { display } : undefined,
          )}
        </span>
      ))}
    </div>
  );
}
