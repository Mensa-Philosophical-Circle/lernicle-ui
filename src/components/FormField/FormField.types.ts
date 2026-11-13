import type { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  /** A message or a form error code; codes are translated. */
  error?: string;
  /** Sits between the label and the control. */
  indicator?: ReactNode;
  /** Quiet text at the end of the label row, such as a character count. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}
