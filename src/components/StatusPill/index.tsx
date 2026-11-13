import { cn } from '../../lib/cn';

export type StatusTone =
  | 'good'
  | 'warning'
  | 'bad'
  | 'brand'
  | 'info'
  | 'neutral';

const TONES: Record<StatusTone, string> = {
  good: 'bg-success/15 text-success',
  warning: 'bg-warning-soft text-warning-on-soft',
  bad: 'bg-destructive/10 text-destructive',
  brand: 'bg-secondary text-secondary-foreground',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted text-muted-foreground',
};

/** A status as a word and a colour. Pass the word translated. */
export function StatusPill({
  label,
  tone = 'neutral',
  className,
}: {
  label: string;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center whitespace-nowrap rounded-full px-2.5 text-sm font-semibold leading-5',
        TONES[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
