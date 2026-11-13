/** Shown for a missing or non-numeric value, as in the apps. */
const EMPTY = '—';
const ISO_CURRENCY = /^[A-Za-z]{3}$/;

/**
 * The number options the kit passes. Kept narrow so an app's own formatters,
 * which may accept less than Intl does, still fit.
 */
export interface UINumberOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'compact';
}

export interface UIMoneyOptions extends UINumberOptions {
  /** How the currency is written: symbol (default), narrow sign, ISO code or name. */
  display?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
}

export interface UIPercentOptions extends UINumberOptions {
  /** `points` (default): 85 means 85%. `fraction`: 0.85 means 85%. */
  unit?: 'points' | 'fraction';
}

/**
 * The formatters the kit needs, with the same meaning as the apps' own, so an
 * app passes its `useFormatters()` result straight in.
 */
export interface UIFormatters {
  money: (
    amount: number | null | undefined,
    currency?: string | null,
    options?: UIMoneyOptions,
  ) => string;
  compactMoney: (
    amount: number | null | undefined,
    currency?: string | null,
    options?: UIMoneyOptions,
  ) => string;
  number: (
    value: number | null | undefined,
    options?: UINumberOptions,
  ) => string;
  percent: (
    value: number | null | undefined,
    options?: UIPercentOptions,
  ) => string;
}

const isNumber = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function formatMoney(
  amount: number | null | undefined,
  currency: string | null | undefined,
  locale: string | undefined,
  options: UIMoneyOptions = {},
): string {
  if (!isNumber(amount)) return EMPTY;
  const { display = 'symbol', ...rest } = options;
  const code = currency?.trim();

  if (code && ISO_CURRENCY.test(code)) {
    return new Intl.NumberFormat(locale, {
      ...rest,
      style: 'currency',
      currency: code.toUpperCase(),
      currencyDisplay: display,
    }).format(amount);
  }

  const plain = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    ...rest,
  }).format(amount);

  return code ? `${code}${plain}` : plain;
}

/** Plain Intl formatters, used when the app passes none of its own. */
export function createDefaultFormatters(
  locale: string | undefined,
  currency: string | undefined,
): UIFormatters {
  return {
    money: (amount, own, options) =>
      formatMoney(amount, own ?? currency, locale, options),
    compactMoney: (amount, own, options) =>
      formatMoney(amount, own ?? currency, locale, {
        maximumFractionDigits: 1,
        ...options,
        notation: 'compact',
      }),
    number: (value, options) =>
      isNumber(value) ? new Intl.NumberFormat(locale, options).format(value) : EMPTY,
    percent: (value, options = {}) => {
      if (!isNumber(value)) return EMPTY;
      const { unit = 'points', ...rest } = options;

      return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
        ...rest,
        style: 'percent',
      }).format(unit === 'points' ? value / 100 : value);
    },
  };
}
