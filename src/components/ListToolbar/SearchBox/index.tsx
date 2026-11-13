import type { SearchBoxProps } from '../ListToolbar.types';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { SecureInput } from '../../../secure/secure-input';
import { useUIText } from '../../../provider/LernicleUIProvider';
import { cn } from '../../../lib/cn';

/** The 48px search field at the head of every list. */
export function SearchBox({
  value,
  onChange,
  label,
  placeholder,
  className,
}: SearchBoxProps) {
  const { t } = useUIText();

  return (
    <div
      className={cn(
        'flex h-12 min-w-0 flex-[999_1_240px] items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 text-muted-foreground focus-within:ring-2 focus-within:ring-ring [&>div]:min-w-0 [&>div]:flex-1',
        className,
      )}
    >
      <MagnifyingGlass
        aria-hidden="true"
        className="shrink-0"
        size={20}
        weight="regular"
      />
      <SecureInput
        aria-label={label}
        className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-[15px] leading-[22px] text-foreground shadow-none focus-visible:ring-0 md:text-[15px]"
        placeholder={placeholder ?? t('ui.list.search')}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
