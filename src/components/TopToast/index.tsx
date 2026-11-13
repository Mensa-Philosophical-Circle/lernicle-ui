import { useEffect } from 'react';

import { useUIText } from '../../provider/LernicleUIProvider';

const SHOWN_FOR_MS = 6000;

/** A short confirmation at the top of the screen, centred, gone after a few seconds. Renders nothing without text. */
export function TopToast({
  text,
  onDismiss,
}: {
  text: string;
  onDismiss: () => void;
}) {
  const { t } = useUIText();

  useEffect(() => {
    if (!text) return;
    const timer = window.setTimeout(onDismiss, SHOWN_FOR_MS);

    return () => window.clearTimeout(timer);
  }, [text, onDismiss]);

  if (!text) return null;

  return (
    <div
      className="fixed start-1/2 top-4 z-[60] flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-3 rounded-[14px] bg-foreground py-1.5 pe-2 ps-4 font-brief-body text-[15px] font-semibold leading-[22px] text-background rtl:translate-x-1/2"
      role="status"
    >
      <span>{text}</span>
      <button
        aria-label={t('ui.close')}
        className="h-11 w-11 flex-none rounded-xl text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        type="button"
        onClick={onDismiss}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
