import * as React from 'react';
import DOMPurify from 'dompurify';
import { Eye, EyeSlash } from '@phosphor-icons/react';

import { Input } from '../primitives/input';
import { cn } from '../lib/cn';

export interface SecureInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'onChange'> {
  maxLength?: number;

  sanitize?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  (
    {
      className,
      maxLength = 255,
      sanitize = true,
      onChange,
      onBlur,
      required,
      ...props
    },
    ref,
  ) => {
    const [touched, setTouched] = React.useState(false);
    const [isEmpty, setIsEmpty] = React.useState(
      !props.defaultValue && !props.value,
    );
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = props.type === 'password';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (sanitize) {
        const sanitized = DOMPurify.sanitize(value, {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
        });

        if (sanitized !== value) {
          value = sanitized;
        }
      }

      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }

      e.target.value = value;
      setIsEmpty(value.length === 0);

      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      setIsEmpty(e.target.value.length === 0);

      if (sanitize) {
        const value = e.target.value;

        // Aggressive sanitization on blur
        if (value.includes('<')) {
          // In some test environments, DOMPurify needs explicit window
          const purify =
            typeof window !== 'undefined'
              ? DOMPurify
              : DOMPurify(window as any);
          const sanitized = purify.sanitize(value, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
          });

          if (sanitized !== value) {
            e.target.value = sanitized;

            // Trigger change for parent
            const event = new Event('input', { bubbles: true });

            e.target.dispatchEvent(event);

            // Also call onChange if provided
            const syntheticEvent = {
              ...e,
              target: e.target,
              currentTarget: e.target,
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            onChange?.(syntheticEvent);

            setIsEmpty(sanitized.length === 0);
          }
        }
      }
      onBlur?.(e);
    };

    const hasError =
      (required && touched && isEmpty) ||
      props['aria-invalid'] === 'true' ||
      props['aria-invalid'] === true;

    return (
      <div className="relative">
        <Input
          ref={ref}
          autoComplete="off"
          className={cn(
            hasError && 'border-destructive focus-visible:ring-destructive',
            isPassword && 'pr-10',
            className,
          )}
          maxLength={maxLength}
          required={required}
          {...props}
          type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {isPassword && (
          <button
            aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlash className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  },
);

SecureInput.displayName = 'SecureInput';

export { SecureInput };
