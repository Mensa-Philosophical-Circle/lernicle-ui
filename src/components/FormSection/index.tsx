import type { ReactNode } from 'react';

import { fieldHintClass } from '../../styles/formStyles';
import { cn } from '../../lib/cn';

/** A plain section: title and note on the left, fields on the right. */
export function FormSection({
  title,
  note,
  last = false,
  children,
}: {
  title: string;
  note?: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'flex flex-wrap gap-x-8 gap-y-3.5 py-7',
        !last && 'border-b border-border',
      )}
    >
      <div className="min-w-0 flex-[1_1_200px]">
        <h2 className="font-brief-display text-lg font-bold leading-6">
          {title}
        </h2>
        {note && <p className={`mt-1 ${fieldHintClass}`}>{note}</p>}
      </div>
      <div className="flex min-w-0 flex-[999_1_340px] flex-col gap-4">
        {children}
      </div>
    </section>
  );
}
