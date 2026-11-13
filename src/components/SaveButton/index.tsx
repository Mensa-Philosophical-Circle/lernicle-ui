import type { SaveButtonProps } from './SaveButton.types';

import { primaryButtonClass } from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { useUIText } from '../../provider/LernicleUIProvider';

/** The primary save button for a SaveBar: says when it is working, and cannot be pressed twice. */
export function SaveButton({
  label,
  busyLabel,
  busy = false,
  disabled = false,
  onClick,
}: SaveButtonProps) {
  const { t } = useUIText();

  return (
    <Button
      className={primaryButtonClass}
      disabled={disabled || busy}
      type="button"
      variant="ghost"
      onClick={onClick}
    >
      {busy ? (busyLabel ?? t('ui.working')) : label}
    </Button>
  );
}
