import type { ReactNode } from 'react';

import {
  detailCardClass,
  detailTitleClass,
} from '../../styles/formStyles';

export interface DetailRow {
  label: string;
  value: string;
}

export interface DetailSectionProps {
  title: string;
  rows: DetailRow[];
  action?: ReactNode;
}

/** A titled block of "label, value" rows. */
export function DetailSection({ title, rows, action }: DetailSectionProps) {
  return (
    <section className={detailCardClass}>
      <h3 className={detailTitleClass}>{title}</h3>
      <dl className="m-0">
        {rows.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className="flex justify-between gap-3.5 border-t border-border py-[9px]"
          >
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="m-0 min-w-0 break-words text-end font-semibold">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {action}
    </section>
  );
}
