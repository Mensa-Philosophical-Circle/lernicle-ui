import type {
  PageErrorProps,
  PageNoteProps,
  StatePanelProps,
} from './PageStates.types';

import { secondaryButtonClass } from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { Skeleton } from '../../primitives/skeleton';
import { useUIText } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

/** The soft panel for "nothing here yet" and "couldn't load". */
export function StatePanel({
  title,
  body,
  note,
  actions,
  tone = 'soft',
  className,
}: StatePanelProps) {
  const danger = tone === 'danger';

  return (
    <section
      className={cn(
        'rounded-3xl p-[clamp(18px,3vw,26px)]',
        danger
          ? 'bg-destructive/10 text-destructive'
          : 'bg-secondary text-secondary-foreground',
        className,
      )}
      role={danger ? 'alert' : undefined}
    >
      <h2 className="m-0 font-brief-display text-[clamp(1.45rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.02em]">
        {title}
      </h2>
      {body && <p className="m-0 mt-1.5 text-base leading-[22px]">{body}</p>}
      {note && <p className="m-0 mt-1 text-sm leading-5">{note}</p>}
      {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
    </section>
  );
}

/** A list or page that could not load, with Try again. */
export function PageError({ title, body, onRetry }: PageErrorProps) {
  const { t } = useUIText();

  return (
    <StatePanel
      actions={
        <Button
          className={secondaryButtonClass}
          type="button"
          variant="ghost"
          onClick={onRetry}
        >
          {t('ui.tryAgain')}
        </Button>
      }
      body={body ?? t('ui.state.nothingChanged')}
      title={title}
      tone="danger"
    />
  );
}

/** Under a list when the search or filters match nothing. */
export function NoMatches({
  text,
  onClear,
}: {
  text: string;
  onClear?: () => void;
}) {
  const { t } = useUIText();

  return (
    <div className="border-t border-border px-2 py-7 text-center">
      <p className="m-0 text-muted-foreground">{text}</p>
      {onClear && (
        <button
          aria-label={t('ui.list.clear')}
          className="min-h-11 font-semibold text-primary"
          type="button"
          onClick={onClear}
        >
          {t('ui.list.clear')}
        </button>
      )}
    </div>
  );
}

const NOTE_TONES = {
  good: 'bg-success/15 text-success',
  soft: 'bg-secondary text-secondary-foreground',
  warning: 'bg-warning-soft text-warning-on-soft',
  danger: 'bg-destructive/10 text-destructive',
} as const;

/** A one-line message across the page. Danger is announced straight away. */
export function PageNote({
  children,
  tone = 'soft',
  action,
  className,
}: PageNoteProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl px-3.5 py-3 font-semibold',
        NOTE_TONES[tone],
        className,
      )}
      role={tone === 'danger' ? 'alert' : 'status'}
    >
      <span className="min-w-0">{children}</span>
      {action && (
        <button
          aria-label={action.label}
          className={cn(
            '-my-2 min-h-11 font-semibold',
            action.solid && 'rounded-xl bg-card px-4 text-foreground',
          )}
          type="button"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/** Placeholder rows while a list loads for the first time. */
export function ListSkeleton({
  rows = 6,
  label,
}: {
  rows?: number;
  /** Shown above the shapes and read out, such as "Loading…". */
  label?: string;
}) {
  if (!label) return <ListSkeletonShapes rows={rows} />;

  return (
    <div className="flex flex-col gap-4">
      {label && (
        <p className="m-0 text-muted-foreground" role="status">
          {label}
        </p>
      )}
      <ListSkeletonShapes rows={rows} />
    </div>
  );
}

function ListSkeletonShapes({ rows }: { rows: number }) {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      <Skeleton className="h-12 w-full rounded-xl" />
      <div>
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-t border-border p-2"
          >
            <Skeleton className="size-11 rounded-full" />
            <Skeleton className="h-4 flex-1 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
