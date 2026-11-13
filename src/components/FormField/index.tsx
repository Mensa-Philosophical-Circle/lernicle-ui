import type { FormFieldProps } from './FormField.types';

import {
  fieldHintClass,
  formErrorClass,
  labelClass,
} from '../../styles/formStyles';
import { useUI } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

/** A label above its control, then an optional hint and error. */
export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  indicator,
  aside,
  className,
  children,
}: FormFieldProps) {
  const { formatError } = useUI();

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label className={labelClass} htmlFor={htmlFor}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </label>
        {aside && <span className={`${fieldHintClass} text-end`}>{aside}</span>}
      </div>
      {indicator}
      {children}
      {hint && <p className={fieldHintClass}>{hint}</p>}
      {error && (
        <p className={formErrorClass} role="alert">
          {formatError(error)}
        </p>
      )}
    </div>
  );
}
