import type { ReactNode } from 'react';

/** Give this to the action inside a WayCard. */
export const wayActionClass =
  'mt-2 inline-flex min-h-11 items-center self-start rounded-[14px] bg-primary px-4 font-semibold text-primary-foreground no-underline hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/** One way of getting started, on an empty screen. */
export function WayCard({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-[20px] border border-border bg-card p-5">
      <strong className="font-brief-display text-lg font-bold">{title}</strong>
      <span className="flex-auto text-muted-foreground">{detail}</span>
      {children}
    </div>
  );
}
