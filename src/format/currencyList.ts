export interface CurrencyOption {
  /** ISO 4217 code, upper case. */
  code: string;
  /** The currency's name in the reader's language. */
  name: string;
}

const CODE = /^[A-Za-z]{3}$/;

export function isCurrencyCode(value: unknown): value is string {
  return typeof value === 'string' && CODE.test(value.trim());
}

/** Every currency this browser's Intl knows; empty on engines without the API. */
export function supportedCurrencyCodes(): string[] {
  try {
    const intl = Intl as unknown as {
      supportedValuesOf?: (key: string) => string[];
    };

    return intl.supportedValuesOf?.('currency') ?? [];
  } catch {
    return [];
  }
}

/** "Euro", "euro", "Nigerian Naira": the code itself when Intl has no name. */
export function currencyDisplayName(code: string, locale: string): string {
  try {
    return (
      new Intl.DisplayNames([locale], { type: 'currency' }).of(
        code.toUpperCase(),
      ) ?? code
    );
  } catch {
    return code;
  }
}

const cache = new Map<string, CurrencyOption[]>();

/**
 * The currencies to pick from, named in the given locale and sorted by name.
 * It is the platform's own list, so no country or region is favoured here.
 */
export function listCurrencyOptions(locale: string): CurrencyOption[] {
  const cached = cache.get(locale);

  if (cached) return cached;

  const options = supportedCurrencyCodes()
    .map((code) => ({ code, name: currencyDisplayName(code, locale) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  cache.set(locale, options);

  return options;
}
