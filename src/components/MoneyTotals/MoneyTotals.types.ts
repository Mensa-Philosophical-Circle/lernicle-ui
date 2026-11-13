import type { CurrencyTotal } from '../../format/currencyTotals';

export interface MoneyTotalsProps {
  /** One total per currency, from `totalsByCurrency`. Never pre-added. */
  totals: readonly CurrencyTotal[];
  /** Shorten large amounts (1.2M) for tight spaces. */
  compact?: boolean;
  /** How the currency is written; `code` shows GHS rather than a sign. */
  display?: 'symbol' | 'code';
  /** Shown when there are no totals, instead of a bare zero. */
  emptyText?: string;
  className?: string;
}
