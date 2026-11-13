import type { ReactNode } from 'react';

/** A small label above a filter control, for filters that sit in the page. */
export function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-[160px] flex-[1_1_180px]">
      <span className="mb-1 block text-[13px] font-semibold leading-[18px] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}
