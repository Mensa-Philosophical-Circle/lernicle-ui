import type { ConfirmDialogProps } from './ConfirmDialog.types';

import {
  ModalShell,
  ModalShellDescription,
} from '../ModalShell';
import {
  dangerButtonClass,
  dialogActionsClass,
  dialogPrimaryButtonClass,
  quietButtonClass,
} from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { useUIText } from '../../provider/LernicleUIProvider';

/** The one centred confirm for anything with a real consequence. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  body,
  detail,
  warning,
  confirmLabel,
  busyLabel,
  cancelLabel,
  tone = 'danger',
  busy = false,
  error,
  onConfirm,
}: ConfirmDialogProps) {
  const { t } = useUIText();

  return (
    <ModalShell
      alert
      described
      open={open}
      title={title}
      onOpenChange={(next) => {
        // A request in flight cannot be taken back by closing the pop-up.
        if (!busy) onOpenChange(next);
      }}
    >
      <ModalShellDescription className="m-0 text-muted-foreground">
        {body}
      </ModalShellDescription>
      {detail && <p className="mt-2 text-muted-foreground">{detail}</p>}
      {warning && (
        <p className="mt-3 rounded-xl bg-warning-soft px-3.5 py-3 font-semibold text-warning-on-soft">
          {warning}
        </p>
      )}
      {error && (
        <p
          className="mt-3 rounded-xl bg-destructive/10 px-3.5 py-3 font-semibold text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
      <div className={dialogActionsClass}>
        <Button
          className={quietButtonClass}
          disabled={busy}
          type="button"
          variant="ghost"
          onClick={() => onOpenChange(false)}
        >
          {cancelLabel ?? t('ui.cancel')}
        </Button>
        <Button
          className={
            tone === 'danger' ? dangerButtonClass : dialogPrimaryButtonClass
          }
          disabled={busy}
          type="button"
          onClick={onConfirm}
        >
          {busy ? (busyLabel ?? t('ui.working')) : confirmLabel}
        </Button>
      </div>
    </ModalShell>
  );
}
