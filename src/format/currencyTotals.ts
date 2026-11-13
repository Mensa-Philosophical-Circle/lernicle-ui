export interface CurrencyTotal {
  /** ISO code, or null for records that carry none. */
  currency: string | null;
  total: number;
}

/**
 * Sums amounts per currency. Different currencies are never added together:
 * a school may bill tuition in one currency and pay staff in another.
 * Amounts that are not finite numbers are skipped. The result is ordered by
 * currency code, with "no currency" last.
 */
export function totalsByCurrency<T>(
  items: readonly T[],
  amountOf: (item: T) => number | string | null | undefined,
  currencyOf: (item: T) => string | null | undefined,
): CurrencyTotal[] {
  const sums = new Map<string | null, number>();

  for (const item of items) {
    const amount = Number(amountOf(item));

    if (!Number.isFinite(amount)) continue;

    const raw = currencyOf(item)?.trim().toUpperCase();
    const key = raw ? raw : null;

    sums.set(key, (sums.get(key) ?? 0) + amount);
  }

  return [...sums.entries()]
    .map(([currency, total]) => ({ currency, total }))
    .sort((a, b) => {
      if (a.currency === b.currency) return 0;
      if (a.currency === null) return 1;
      if (b.currency === null) return -1;

      return a.currency.localeCompare(b.currency);
    });
}

/** The distinct currencies in the items, in the same order as the totals. */
export function currenciesOf<T>(
  items: readonly T[],
  currencyOf: (item: T) => string | null | undefined,
): string[] {
  return totalsByCurrency(items, () => 0, currencyOf)
    .map((entry) => entry.currency)
    .filter((code): code is string => code !== null);
}

/** One written line per currency, for FiguresRow and pills. */
export function moneyLines(
  totals: readonly CurrencyTotal[],
  format: (amount: number, currency: string | null) => string,
): string[] {
  return totals.map(({ total, currency }) => format(total, currency));
}
