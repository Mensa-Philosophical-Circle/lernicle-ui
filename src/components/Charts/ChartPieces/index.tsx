import type { ReactNode } from 'react';
import type { ChartLegendItem } from '../Charts.types';

import {
  CHART_LINE_COLOR,
  chartColor,
} from '../chartTone';
import { cn } from '../../../lib/cn';

/** A titled chart between thin rules, as the reports are laid out. */
export function ChartSection({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="flex min-w-0 flex-col gap-2.5 border-t border-border pt-[18px]"
    >
      <div>
        <h2 className="m-0 font-brief-display text-lg font-bold leading-6">
          {title}
        </h2>
        {caption && (
          <p className="m-0 mt-0.5 text-sm leading-5 text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

/** What each colour means. */
export function ChartLegend({ items }: { items: ChartLegendItem[] }) {
  return (
    <div className="flex flex-wrap gap-x-3.5 gap-y-1">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 text-sm leading-5 text-muted-foreground"
        >
          <span
            aria-hidden
            className={cn(
              'flex-none',
              item.line ? 'h-0.5 w-3.5 rounded-[calc(var(--radius)-4px)]' : 'size-2.5 rounded-[3px]',
            )}
            style={{
              background: item.tone
                ? chartColor(item.tone)
                : CHART_LINE_COLOR,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

/** The dark label over a hovered bar. */
export function ChartTooltip({
  title,
  lines,
  side,
}: {
  title: string;
  lines: string[];
  side: 'start' | 'end';
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute top-1 z-[6] w-max max-w-[230px] rounded-[10px] bg-foreground px-2.5 py-2 text-sm leading-5 text-background',
        side === 'start' ? 'start-[calc(50%+14px)]' : 'end-[calc(50%+14px)]',
      )}
      role="tooltip"
    >
      <strong className="block font-semibold">{title}</strong>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </div>
  );
}

/** In place of a chart with nothing to draw. */
export function ChartEmpty({ text }: { text: string }) {
  return (
    <p className="m-0 px-2 py-12 text-center text-muted-foreground">{text}</p>
  );
}
