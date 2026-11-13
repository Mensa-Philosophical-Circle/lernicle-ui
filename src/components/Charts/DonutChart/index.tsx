import type { DonutChartProps } from '../Charts.types';

import { useState } from 'react';

import { chartColor } from '../chartTone';
import { useUIFormat } from '../../../provider/LernicleUIProvider';
import { cn } from '../../../lib/cn';

/** A radius of 15.9155 makes the circumference 100, so dashes read as percents. */
const RADIUS = 15.9155;

/** A ring with a row per slice. Different currencies never share one ring. */
export function DonutChart({
  label,
  segments,
  center,
  centerSub,
}: DonutChartProps) {
  const { percent } = useUIFormat();
  const [active, setActive] = useState<number | null>(null);
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let used = 0;

  return (
    <div className="flex flex-wrap items-center gap-[18px]">
      <div className="relative size-[156px] flex-none" role="img" aria-label={label}>
        <svg
          aria-hidden
          className="block rotate-[-90deg]"
          height="156"
          viewBox="0 0 42 42"
          width="156"
        >
          {segments.map((segment, index) => {
            const share = total > 0 ? (segment.value / total) * 100 : 0;
            const dashOffset = -used;

            used += share;

            return (
              <circle
                key={segment.label}
                cx="21"
                cy="21"
                fill="none"
                r={RADIUS}
                stroke={chartColor(segment.tone)}
                strokeDasharray={`${share} ${100 - share}`}
                strokeDashoffset={dashOffset}
                strokeWidth={active === index ? 4.4 : 3.2}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}
        </svg>
        {(center || centerSub) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[30px] text-center">
            {center && (
              <strong className="font-brief-display text-[26px] font-bold leading-[30px]">
                {center}
              </strong>
            )}
            {centerSub && (
              <span className="text-sm leading-5 text-muted-foreground">
                {centerSub}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-[1_1_200px] flex-col">
        {segments.map((segment, index) => (
          <div
            key={segment.label}
            className={cn(
              'flex min-h-9 items-center gap-2 rounded-lg px-1.5 py-0.5',
              active === index && 'bg-muted',
            )}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <span
              aria-hidden
              className="size-2.5 flex-none rounded-[3px]"
              style={{ background: chartColor(segment.tone) }}
            />
            <span className="min-w-0 flex-auto truncate">{segment.label}</span>
            <span className="flex-none font-semibold">
              {percent(total > 0 ? (segment.value / total) * 100 : 0)}
            </span>
            {segment.amount && (
              <span className="flex-none text-sm leading-5 text-muted-foreground">
                {segment.amount}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
