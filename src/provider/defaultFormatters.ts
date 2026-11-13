/** The few formatters the kit needs. An app's own formatters satisfy this. */
export interface UIFormatters {
  number: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => string;
  percent: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => string;
  money: (amount: number | null | undefined, currency?: string | null) => string;
  compactMoney: (amount: number | null | undefined, currency?: string | null) => string;
}

function safe(value: number | null | undefined, format: (n: number) => string): string {
  return value == null || Number.isNaN(value) ? '' : format(value);
}

/** Plain Intl formatters, used when the app passes none of its own. */
export function createDefaultFormatters(
  locale: string | undefined,
  currency: string | undefined,
): UIFormatters {
  const moneyIn = (own: string | null | undefined, compact: boolean) => {
    const code = own ?? currency;

    return (n: number) =>
      code
        ? new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: code,
            notation: compact ? 'compact' : 'standard',
          }).format(n)
        : new Intl.NumberFormat(locale, {
            notation: compact ? 'compact' : 'standard',
          }).format(n);
  };

  return {
    number: (value, options) =>
      safe(value, (n) => new Intl.NumberFormat(locale, options).format(n)),
    // A ratio: 0.42 is 42%.
    percent: (value, options) =>
      safe(value, (n) =>
        new Intl.NumberFormat(locale, { style: 'percent', ...options }).format(n),
      ),
    money: (amount, own) => safe(amount, moneyIn(own, false)),
    compactMoney: (amount, own) => safe(amount, moneyIn(own, true)),
  };
}
