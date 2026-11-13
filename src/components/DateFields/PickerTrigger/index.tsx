import type { Icon } from '@phosphor-icons/react';
import type { PickerFieldProps } from '../DateFields.types';

import { cn } from '../../../lib/cn';

/** The 48px field that opens a date or month pop-up. */
export function PickerTrigger({
  label,
  id,
  text,
  chosen,
  icon: Glyph,
  disabled,
  invalid,
  className,
  onOpen,
}: Omit<PickerFieldProps, 'placeholder'> & {
  text: string;
  chosen: boolean;
  icon: Icon;
  onOpen: () => void;
}) {
  return (
    // aria-invalid is the only way to tell a screen reader this field has a problem.
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
      aria-haspopup="dialog"
      aria-invalid={invalid || undefined}
      aria-label={`${label}: ${text}`}
      className={cn(
        'flex h-12 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 text-start font-brief-body text-[15px] leading-[22px] outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60',
        chosen ? 'text-foreground' : 'text-muted-foreground',
        invalid && 'border-destructive',
        className,
      )}
      disabled={disabled}
      id={id}
      type="button"
      onClick={onOpen}
    >
      <span className="min-w-0 truncate">{text}</span>
      <Glyph
        aria-hidden
        className="flex-none text-primary"
        size={20}
        weight="duotone"
      />
    </button>
  );
}
