import type { KeyboardEvent } from 'react';

import { useUIText } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

/** Tabs drawn as an underline. Scrolls sideways by itself when they don't fit. */
export function UnderlineTabs<T extends string>({
  label,
  value,
  tabs,
  onChange,
  className,
}: {
  label: string;
  value: T;
  tabs: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}) {
  const { dir } = useUIText();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';

    if (event.key !== forward && event.key !== back) return;
    event.preventDefault();

    const step = event.key === forward ? 1 : -1;
    const index = tabs.findIndex((tab) => tab.value === value);
    const next = tabs[(index + step + tabs.length) % tabs.length];

    onChange(next.value);
    (
      event.currentTarget.querySelector(
        `[data-tab="${CSS.escape(next.value)}"]`,
      ) as HTMLElement | null
    )?.focus();
  };

  return (
    <div
      aria-label={label}
      className={cn(
        'flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none]',
        className,
      )}
      role="tablist"
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab) => {
        const on = tab.value === value;

        return (
          <button
            key={tab.value}
            aria-label={tab.label}
            aria-selected={on}
            className={cn(
              'flex-none whitespace-nowrap border-b-2 px-3.5 font-semibold outline-none min-h-12 -mb-px focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              on
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            data-tab={tab.value}
            role="tab"
            tabIndex={on ? 0 : -1}
            type="button"
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
