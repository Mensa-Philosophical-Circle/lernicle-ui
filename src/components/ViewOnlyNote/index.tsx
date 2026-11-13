/** Why a page is view only, as the apps' `useViewOnly` reports it. */
export type ViewOnlyReason = 'subscription' | 'permission';

import { PageNote } from '../PageStates';
import { useUIText } from '../../provider/LernicleUIProvider';

/**
 * Says why nothing can be changed here. Renders nothing when `reason` is null,
 * so pass the reason from the app's useViewOnly as it is. `text` replaces the sentence
 * with one naming the section. Once the subscription ends the announcement bar
 * already says so, and the designs show no second line, so that renders nothing.
 */
export function ViewOnlyNote({
  reason,
  text,
}: {
  reason: ViewOnlyReason | null;
  text?: string;
}) {
  const { t } = useUIText();

  if (!reason || reason === 'subscription') return null;

  return <PageNote>{text ?? t(`ui.viewOnly.${reason}`)}</PageNote>;
}
