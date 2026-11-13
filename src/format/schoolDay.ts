/** Today as YYYY-MM-DD in the school's timezone. */
export function schoolDay(now: Date, timeZone?: string | null): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timeZone ?? undefined,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** The current time as HH:mm on the school's clock. */
export function schoolTime(now: Date, timeZone?: string | null): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timeZone ?? undefined,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);
}

/** The wall-clock date and time of an instant in a time zone, as numbers. */
export function wallClock(instant: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date(instant));
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    y: get('year'),
    m: get('month'),
    d: get('day'),
    h: get('hour'),
    min: get('minute'),
  };
}
