import type { BarsChartProps } from '../Charts.types';

import { useState } from 'react';

import { ChartTooltip } from '../ChartPieces';
import {
  CHART_LINE_COLOR,
  chartColor,
} from '../chartTone';
import { useUIText } from '../../../provider/LernicleUIProvider';
import { chartScale } from '../../../format/chartScale';

const HOVER_AREA = 'absolute inset-0 z-[3]';

/** Grouped bars with an optional line over them. Colours come from the theme. */
export function BarsChart({
  label,
  series,
  groups,
  line,
  formatTick,
  height = 190,
}: BarsChartProps) {
  const { dir } = useUIText();
  const [active, setActive] = useState<number | null>(null);
  const lineValues = (line ?? []).filter((v): v is number => v !== null);
  const scale = chartScale([...groups.flatMap((g) => g.values), ...lineValues]);
  const zero = scale.topPercent(0);
  const stepPercent = 100 / groups.length;
  const points = (line ?? []).flatMap((value, index) =>
    value === null
      ? []
      : [{ x: (index + 0.5) * stepPercent, y: scale.topPercent(value) }],
  );

  const hover = (index: number) => ({
    onMouseEnter: () => setActive(index),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(index),
    onBlur: () => setActive(null),
  });

  return (
    <div
      aria-label={label}
      role={groups.some((group) => group.onPick) ? 'group' : 'img'}
    >
      <div className="flex gap-1.5" style={{ height }}>
        <div aria-hidden className="relative flex-[0_0_40px]">
          {scale.ticks.map((tick) => (
            <span
              key={tick}
              className="absolute end-0 -translate-y-1/2 whitespace-nowrap text-sm leading-5 text-muted-foreground"
              style={{ top: `${scale.topPercent(tick)}%` }}
            >
              {formatTick(tick)}
            </span>
          ))}
        </div>
        <div className="relative min-w-0 flex-auto">
          {scale.ticks.map((tick) => (
            <span
              key={tick}
              className="absolute inset-x-0 h-px bg-border"
              style={{ top: `${scale.topPercent(tick)}%` }}
            />
          ))}
          <div className="absolute inset-0 flex">
            {groups.map((group, index) => (
              <div key={group.label} className="relative min-w-0 flex-1">
                <div className="absolute inset-0 flex justify-center gap-1">
                  {group.values.map((value, bar) => {
                    const top = scale.topPercent(Math.max(value, 0));
                    const bottom = scale.topPercent(Math.min(value, 0));

                    return (
                      <span
                        key={series[bar]?.label ?? bar}
                        className="relative h-full flex-[0_0_10px]"
                      >
                        <span
                          className="absolute inset-x-0 rounded-t-[5px] rounded-b-sm"
                          style={{
                            top: `${top}%`,
                            height: `${bottom - top}%`,
                            background: chartColor(series[bar]?.tone ?? 1),
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
                {group.onPick ? (
                  <button
                    {...hover(index)}
                    aria-label={group.pickLabel ?? group.label}
                    className={`${HOVER_AREA} rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                    data-chart-group
                    type="button"
                    onClick={group.onPick}
                  />
                ) : (
                  <div {...hover(index)} className={HOVER_AREA} data-chart-group />
                )}
                {active === index && (
                  <ChartTooltip
                    lines={group.tipLines}
                    side={index < groups.length / 2 ? 'start' : 'end'}
                    title={group.tipTitle ?? group.label}
                  />
                )}
              </div>
            ))}
          </div>
          {points.length > 0 && (
            <>
              <svg
                className="pointer-events-none absolute inset-0 z-[2] size-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <polyline
                  fill="none"
                  // The plot reads right to left in Arabic; an SVG doesn't.
                  points={points
                    .map((p) => `${dir === 'rtl' ? 100 - p.x : p.x},${p.y}`)
                    .join(' ')}
                  stroke={CHART_LINE_COLOR}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {points.map((point) => (
                <span
                  key={point.x}
                  className="pointer-events-none absolute z-[2] -ms-[4.5px] -mt-[4.5px] size-[9px] rounded-full border-2 border-card bg-foreground"
                  style={{ insetInlineStart: `${point.x}%`, top: `${point.y}%` }}
                />
              ))}
            </>
          )}
          {zero < 100 && (
            <span
              className="absolute inset-x-0 h-px bg-muted-foreground"
              style={{ top: `${zero}%` }}
            />
          )}
        </div>
      </div>
      <div aria-hidden className="mt-1.5 flex ps-[46px]">
        {groups.map((group) => (
          <span
            key={group.label}
            className="min-w-0 flex-1 truncate text-center text-sm leading-5 text-muted-foreground"
          >
            {group.label}
          </span>
        ))}
      </div>
    </div>
  );
}
