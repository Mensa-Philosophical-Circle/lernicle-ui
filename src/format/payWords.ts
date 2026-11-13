/** How many decimals a currency has, from Intl. Never assumed to be two. */
export function currencyDigits(currency: string): number {
  try {
    return (
      new Intl.NumberFormat('en', {
        style: 'currency',
        currency,
      }).resolvedOptions().maximumFractionDigits ?? 2
    );
  } catch {
    return 2;
  }
}

/** "YYYY-MM-DD" to the month name and year, without passing through a time zone. */
export function monthYearTitle(day: string, locale: string): string {
  const [year, month] = day.split('-').map(Number);

  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** A weekday's name, 0 for Sunday, in the reader's language. */
export function weekdayName(
  weekday: number,
  locale: string,
  width: 'short' | 'long',
): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: width,
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2023, 0, 1 + weekday)));
}
