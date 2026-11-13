import { secondaryButtonClass } from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { useUIText } from '../../provider/LernicleUIProvider';

/** One part of a page that could not load, with Try again; the rest stays usable. */
export function InlineError({
  title,
  onRetry,
}: {
  title: string;
  onRetry: () => void;
}) {
  const { t } = useUIText();

  return (
    <div
      className="rounded-[20px] bg-destructive/10 px-5 py-[18px] text-destructive"
      role="alert"
    >
      <strong className="block font-semibold">{title}</strong>
      <div className="mt-2">
        <Button
          className={secondaryButtonClass}
          type="button"
          variant="ghost"
          onClick={onRetry}
        >
          {t('ui.tryAgain')}
        </Button>
      </div>
    </div>
  );
}
