import type { Icon } from '@phosphor-icons/react';

/** A 44px square arrow; arrows turn round in right-to-left languages. */
export function PickerNavButton({
  label,
  icon: Glyph,
  disabled,
  large,
  onClick,
}: {
  label: string;
  icon: Icon;
  disabled?: boolean;
  /** 48px, for a control standing in the page rather than in a pop-up. */
  large?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className={`grid ${large ? 'size-12' : 'size-11'} flex-none place-items-center rounded-xl border border-border bg-card text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <Glyph
        aria-hidden
        className="rtl:rotate-180"
        size={large ? 20 : 18}
        weight="bold"
      />
    </button>
  );
}
