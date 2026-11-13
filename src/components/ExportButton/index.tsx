import { secondaryButtonClass } from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { useExportAction } from '../../lists/useExportAction';
import { useUIText } from '../../provider/LernicleUIProvider';

/**
 * Says "Preparing…" while the file is made. `onExport` should cover everything
 * matching the filters, so pass `list.matching` from usePagedList to the API.
 */
export function ExportButton({
  onExport,
  label,
  disabled,
}: {
  onExport: () => Promise<unknown>;
  label?: string;
  disabled?: boolean;
}) {
  const { t } = useUIText();
  const { run, isPreparing } = useExportAction(onExport);

  return (
    <Button
      aria-busy={isPreparing}
      className={`${secondaryButtonClass} flex-none`}
      disabled={disabled || isPreparing}
      type="button"
      variant="ghost"
      onClick={run}
    >
      {isPreparing ? t('ui.export.preparing') : (label ?? t('ui.export.label'))}
    </Button>
  );
}
