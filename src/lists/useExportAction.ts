import { useCallback, useRef, useState } from 'react';

import { useUI } from '../provider/LernicleUIProvider';

/**
 * Runs one export at a time and says when it fails, through the app's toast.
 * Use it directly for an export inside a "More" menu; ExportButton is the
 * usual way.
 */
export function useExportAction(exportFile: () => Promise<unknown>) {
  const { text: t, notify } = useUI();
  const [isPreparing, setIsPreparing] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setIsPreparing(true);
    try {
      await exportFile();
    } catch {
      notify({
        title: t('ui.export.failed'),
        description: t('ui.state.nothingChanged'),
        tone: 'error',
      });
    } finally {
      running.current = false;
      setIsPreparing(false);
    }
  }, [exportFile, t, notify]);

  return { run, isPreparing };
}
