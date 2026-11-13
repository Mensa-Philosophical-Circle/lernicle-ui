import type { ReactNode } from 'react';

export interface StatePanelProps {
  title: string;
  body?: string;
  /** A smaller line under the body. */
  note?: string;
  /** Buttons or links; use the shared button classes. */
  actions?: ReactNode;
  tone?: 'soft' | 'danger';
  className?: string;
}

export interface PageErrorProps {
  title: string;
  body?: string;
  onRetry: () => void;
}

export interface PageNoteProps {
  children: ReactNode;
  tone?: 'good' | 'soft' | 'warning' | 'danger';
  /** Optional link-style button at the end. */
  action?: { label: string; onClick: () => void; solid?: boolean };
  className?: string;
}
