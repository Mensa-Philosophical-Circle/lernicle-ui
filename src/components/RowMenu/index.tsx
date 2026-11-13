import { DotsThree } from '@phosphor-icons/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { cn } from '../../lib/cn';
import { useUI } from '../../provider/LernicleUIProvider';

export interface RowMenuItem {
  label: string;
  onSelect?: () => void;
  /** Goes to this page instead of calling `onSelect`. */
  to?: string;
  danger?: boolean;
}

/** The "…" button at the end of a row, or a named "More" button. */
export function RowMenu({
  label,
  items,
  triggerText,
  triggerClassName,
}: {
  /** Names the row for screen readers: "More for Ada". */
  label: string;
  items: RowMenuItem[];
  /** Replaces the dots with a word. */
  triggerText?: string;
  triggerClassName?: string;
}) {
  const { navigate } = useUI();

  // A menu with nothing in it, such as for a view-only login, is left out.
  if (items.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={label}
          className={cn(
            !triggerText &&
              'grid h-11 w-11 flex-none place-items-center rounded-xl text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            triggerClassName,
          )}
          type="button"
        >
          {triggerText ?? <DotsThree aria-hidden size={22} weight="bold" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[180px] rounded-[14px] border-border bg-popover p-1.5 font-brief-body text-foreground shadow-none"
        sideOffset={2}
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className={cn(
              'min-h-11 cursor-pointer rounded-lg px-3 py-[11px] text-[15px] leading-[22px]',
              item.danger && 'text-destructive focus:text-destructive',
            )}
            onSelect={() => (item.to ? navigate(item.to) : item.onSelect?.())}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
