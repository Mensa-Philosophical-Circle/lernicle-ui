import { Bank, WarningCircle } from '@phosphor-icons/react';

import { Button } from '../../primitives/button';
import {
  dialogPrimaryButtonClass,
  primaryLinkClass,
} from '../../styles/formStyles';
import { useUI } from '../../provider/LernicleUIProvider';

/**
 * Stands in for a money page until the school's bank account is connected.
 * `reason` is the page's own sentence. Give `onRetry` when the check itself
 * failed: the panel then says so and offers Try again instead of Connect.
 * `connectHref` is the app's page for connecting the bank.
 */
export function BankLockPanel({
  reason,
  connectHref,
  onRetry,
}: {
  reason: string;
  connectHref: string;
  onRetry?: () => void;
}) {
  const { text: t, Link } = useUI();
  const checkFailed = Boolean(onRetry);
  const Glyph = checkFailed ? WarningCircle : Bank;

  return (
    <section className="flex flex-col items-center rounded-3xl bg-secondary px-6 py-12 text-center text-secondary-foreground">
      <span className="grid size-[72px] place-items-center rounded-[22px] bg-card text-primary">
        <Glyph aria-hidden size={36} weight="duotone" />
      </span>
      <h2 className="m-0 mt-[18px] font-brief-display text-2xl font-bold leading-[1.2] tracking-[-0.02em]">
        {checkFailed ? t('ui.bank.checkFailed') : t('ui.bank.title')}
      </h2>
      <p className="m-0 mt-2 max-w-[460px] text-base leading-[22px]">
        {checkFailed ? t('ui.state.checkConnection') : reason}
      </p>
      <div className="mt-[22px]">
        {checkFailed ? (
          <Button
            className={dialogPrimaryButtonClass}
            type="button"
            onClick={onRetry}
          >
            {t('ui.tryAgain')}
          </Button>
        ) : (
          <Link className={primaryLinkClass} href={connectHref}>
            {t('ui.bank.connect')}
          </Link>
        )}
      </div>
    </section>
  );
}
