import type { ReactNode } from 'react';

/** "3 selected", what can be done with them, and Clear. Hidden when nothing is ticked. */
export function SelectionBar({
  count,
  text,
  clearLabel,
  onClear,
  children,
}: {
  count: number;
  text: string;
  clearLabel: string;
  onClear: () => void;
  children?: ReactNode;
}) {
  if (count === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 rounded-xl bg-secondary px-3.5 py-2 text-secondary-foreground">
      <strong className="font-semibold">{text}</strong>
      <span className="flex-auto" />
      {children}
      <button
        aria-label={clearLabel}
        className="min-h-11 px-1.5 text-secondary-foreground"
        type="button"
        onClick={onClear}
      >
        {clearLabel}
      </button>
    </div>
  );
}
