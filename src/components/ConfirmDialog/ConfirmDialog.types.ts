import type { ReactNode } from 'react';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The question, naming the thing: "Delete Ada's fee record?". */
  title: string;
  /** Exactly what will happen, in plain words. */
  body: ReactNode;
  /** A second sentence, such as what cannot be undone. */
  detail?: ReactNode;
  /** A knock-on effect the owner must not miss, shown in an amber note. */
  warning?: ReactNode;
  /** The action in words: "Delete record", never "Yes". */
  confirmLabel: string;
  /** Shown on the button while `busy`, such as "Deleting…". */
  busyLabel?: string;
  cancelLabel?: string;
  /** `danger` for anything destructive (the default); `primary` otherwise. */
  tone?: 'danger' | 'primary';
  busy?: boolean;
  /** Why the last attempt failed; the pop-up stays open. */
  error?: string | null;
  onConfirm: () => void;
}
