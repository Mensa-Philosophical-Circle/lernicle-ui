const pad = (value: number) => String(value).padStart(2, '0');

/** "14:30" as the reader writes times, "2:30 PM" or "14:30". */
export function formatClockTime(value: string, locale: string): string {
  const [hour, minute] = value.split(':').map(Number);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(Date.UTC(2024, 0, 1, hour, minute));
}

/** Every time of day at this step, as `HH:mm`. */
export function clockTimes(stepMinutes: number): string[] {
  return Array.from(
    { length: Math.floor(1440 / stepMinutes) },
    (_, i) =>
      `${pad(Math.floor((i * stepMinutes) / 60))}:${pad((i * stepMinutes) % 60)}`,
  );
}

const TYPED = /^(\d{1,2})(?:[:.](\d{2}))?\s*([ap])?\.?m?\.?$/i;

/** What someone typed as `HH:mm`: "14:30", "930", "2pm", "2.30 pm". Null if it isn't a time. */
export function parseTypedTime(text: string): string | null {
  const trimmed = text.trim().toLowerCase();
  const compact = /^\d{3,4}$/.test(trimmed)
    ? `${trimmed.slice(0, -2)}:${trimmed.slice(-2)}`
    : trimmed;
  const match = TYPED.exec(compact);

  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? 0);
  const meridiem = match[3];

  if (minute > 59) return null;
  if (meridiem) {
    if (hour < 1 || hour > 12) return null;
    hour = (hour % 12) + (meridiem === 'p' ? 12 : 0);
  }
  if (hour > 23) return null;

  return `${pad(hour)}:${pad(minute)}`;
}
