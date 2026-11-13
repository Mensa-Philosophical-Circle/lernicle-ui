import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';

const TONES = {
  neutral: 'text-muted-foreground',
  warning: 'text-warning-on-soft',
  good: 'text-success',
  bad: 'text-destructive',
} as const;

/** The bar that stays under a long form: where it stands on the left, its buttons on the right. */
export function SaveBar({
  status,
  tone = 'neutral',
  children,
}: {
  status: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <div
      data-sticky-bar
      className="sticky bottom-[calc(90px+env(safe-area-inset-bottom))] z-[15] flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-border bg-background py-3 md:bottom-0"
    >
      <span
        className={cn('min-w-0 flex-[1_1_240px] font-semibold', TONES[tone])}
        role="status"
      >
        {status}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
