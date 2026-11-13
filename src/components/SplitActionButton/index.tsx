import type { ReactNode } from 'react';

import { CaretDown } from '@phosphor-icons/react';

import { menuItemClass, menuPanelClass } from '../../styles/formStyles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';

/** Give this to the main action, a link or a button, passed as `children`. */
export const splitPrimaryClass =
  'inline-flex min-h-12 items-center rounded-s-xl bg-primary px-[18px] font-bold text-primary-foreground no-underline hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

/**
 * A main action with an arrow offering other ways to do it. Dialogs opened from
 * `items` must live at page level: the menu unmounts as it closes. `disabled`
 * fades the arrow; disable the main action you pass in too.
 */
export function SplitActionButton({
  moreLabel,
  items,
  children,
  disabled = false,
}: {
  moreLabel: string;
  items: { label: string; onSelect: () => void }[];
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex gap-px">
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            aria-label={moreLabel}
            className="grid min-h-12 w-11 place-items-center rounded-e-xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
            type="button"
          >
            <CaretDown aria-hidden="true" size={16} weight="fill" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={`${menuPanelClass} min-w-[190px]`}
          sideOffset={6}
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className={menuItemClass}
              onSelect={item.onSelect}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
