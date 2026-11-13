import type { ModalShellProps } from './ModalShell.types';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { dialogActionsClass } from '../../styles/formStyles';
import { useUIText } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

export const ModalShellDescription = DialogPrimitive.Description;

const WIDTHS = {
  sm: 'max-w-[460px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[660px]',
  xl: 'max-w-3xl',
} as const;

/**
 * The one pop-up frame: title, close button, and a body that scrolls with the
 * page on small screens. Forms, details and confirms all sit inside it.
 */
export function ModalShell({
  open,
  onOpenChange,
  title,
  size = 'md',
  align = 'centre',
  alert,
  described,
  actions,
  className,
  onCloseAutoFocus,
  children,
}: ModalShellProps) {
  const { t, dir } = useUIText();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-scrim/45 px-4 pb-4',
            align === 'top' ? 'pt-16 sm:pt-24' : 'pt-4',
          )}
        >
          <DialogPrimitive.Content
            {...(described ? {} : { 'aria-describedby': undefined })}
            className={cn(
              'w-full rounded-[20px] bg-card px-6 pb-6 pt-[22px] font-brief-body text-[15px] leading-[22px] text-foreground outline-none',
              align === 'centre' && 'my-auto',
              WIDTHS[size],
              className,
            )}
            dir={dir}
            role={alert ? 'alertdialog' : 'dialog'}
            onCloseAutoFocus={onCloseAutoFocus}
            onInteractOutside={
              alert ? (event) => event.preventDefault() : undefined
            }
            onOpenAutoFocus={(event) => {
              // Start on the pop-up itself, as the design shows no ring on open.
              event.preventDefault();
              (event.currentTarget as HTMLElement | null)?.focus();
            }}
          >
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <DialogPrimitive.Title className="m-0 font-brief-display text-[21px] font-bold leading-[27px]">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <button
                  aria-label={t('ui.close')}
                  className="-me-2.5 h-11 w-11 flex-none rounded-xl text-[22px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </DialogPrimitive.Close>
            </div>
            {children}
            {actions && <div className={dialogActionsClass}>{actions}</div>}
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
