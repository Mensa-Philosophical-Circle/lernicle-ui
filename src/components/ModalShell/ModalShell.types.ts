import type { ReactNode } from 'react';

export type ModalShellSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** sm 460, md 480 (the default), lg 660, xl 768. */
  size?: ModalShellSize;
  /** Centred unless the design pins it near the top. */
  align?: 'centre' | 'top';
  /** A question that must be answered: announced as an alert, and a click outside does not dismiss it. */
  alert?: boolean;
  /** True when the body contains a ModalShellDescription. */
  described?: boolean;
  /** Buttons at the bottom, end-aligned. */
  actions?: ReactNode;
  className?: string;
  onCloseAutoFocus?: (event: Event) => void;
  children: ReactNode;
}
