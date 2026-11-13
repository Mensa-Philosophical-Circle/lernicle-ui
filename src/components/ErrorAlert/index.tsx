import React from 'react';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';

export interface ErrorAlertProps {
  title: string;
  errors?: string | string[];
  type?: 'error' | 'warning' | 'success';
  footer?: React.ReactNode;
}

export function ErrorAlert({
  title,
  errors,
  type = 'error',
  footer,
}: ErrorAlertProps) {
  const errorArray = typeof errors === 'string' ? [errors] : errors || [];

  if (type !== 'success' && errorArray.length === 0) return null;

  const styles = {
    error: {
      container: 'text-destructive bg-destructive/10 border-destructive/30',
      icon: 'text-destructive',
      IconComp: WarningCircle,
    },
    warning: {
      container: 'text-warning bg-warning/10 border-warning/30',
      icon: 'text-warning',
      IconComp: WarningCircle,
    },
    success: {
      container: 'text-success bg-success/10 border-success/30',
      icon: 'text-success',
      IconComp: CheckCircle,
    },
  }[type];

  const Icon = styles.IconComp;

  return (
    <div className={`p-4 text-sm border rounded-md mt-4 ${styles.container}`}>
      <div
        className={`flex items-center gap-2 font-bold ${errorArray.length > 0 ? 'mb-2' : ''}`}
      >
        <Icon className={`w-5 h-5 ${styles.icon}`} /> {title}
      </div>

      {errorArray.length === 1 ? (
        <p className="pl-7 font-medium">{errorArray[0]}</p>
      ) : errorArray.length > 1 ? (
        <div
          aria-label={`${title} description`}
          className="max-h-48 overflow-y-auto overscroll-contain pr-2
            [scrollbar-width:thin]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-current/20"
          role="region"
        >
          <ul className="list-disc pl-7 space-y-1 font-medium break-words">
            {errorArray.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
