import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '../../lib/cn';
import {
  dangerButtonClass,
  dangerLinkButtonClass,
  dialogPrimaryButtonClass,
  linkButtonClass,
  primaryButtonClass,
  quietButtonClass,
  secondaryButtonClass,
} from '../../styles/formStyles';

export type ButtonTone =
  | 'primary'
  | 'dialogPrimary'
  | 'secondary'
  | 'quiet'
  | 'danger'
  | 'link'
  | 'dangerLink';

const TONE: Record<ButtonTone, string> = {
  primary: primaryButtonClass,
  dialogPrimary: dialogPrimaryButtonClass,
  secondary: secondaryButtonClass,
  quiet: quietButtonClass,
  danger: dangerButtonClass,
  link: linkButtonClass,
  dangerLink: dangerLinkButtonClass,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` for the one main action, `secondary` beside it, `danger` for a real consequence. */
  tone?: ButtonTone;
  /** Style a child instead, such as the app's router link. */
  asChild?: boolean;
  /**
   * A square 44px button holding only an icon, as the designs draw them.
   * Give it an `aria-label`.
   */
  iconOnly?: boolean;
}

/**
 * The Lernicle button: 48px, Morning Brief type, theme colours only. A plain
 * button defaults to `type="button"`, so it never submits a form by accident.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { tone = 'primary', asChild = false, iconOnly = false, className, type, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0',
          TONE[tone],
          iconOnly && 'size-11 min-h-11 shrink-0 p-0',
          className,
        )}
        type={asChild ? undefined : (type ?? 'button')}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
