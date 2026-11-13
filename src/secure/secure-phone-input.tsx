import * as React from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { PhoneInput } from '../primitives/phone-input';
import { cn } from '../lib/cn';

export interface SecurePhoneNumberInputProps
  extends React.ComponentPropsWithoutRef<typeof PhoneInput> {
  strictValidation?: boolean;
}

const SecurePhoneNumberInput = React.forwardRef<
  React.ElementRef<typeof PhoneInput>,
  SecurePhoneNumberInputProps
>(
  (
    {
      className,
      onChange,
      onBlur,
      value,
      required,
      strictValidation = true,
      ...props
    },
    ref,
  ) => {
    const [touched, setTouched] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || '');

    React.useEffect(() => {
      setInternalValue(value || '');
    }, [value]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      onBlur?.(e);
    };

    const handleChange = (newValue: any) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const isInvalid =
      strictValidation &&
      internalValue &&
      !isValidPhoneNumber(String(internalValue));
    const isMissing = required && touched && !internalValue;
    const showError = isInvalid || isMissing;

    return (
      <div className="flex flex-col gap-1">
        <PhoneInput
          ref={ref}
          className={cn(
            className,
            showError &&
              'border-destructive focus-within:ring-destructive rounded-md',
          )}
          required={required}
          {...props}
          value={internalValue}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {isInvalid && (
          <span className="text-xs text-destructive">Invalid phone number</span>
        )}
        {isMissing && !isInvalid && (
          <span className="text-xs text-destructive">Required</span>
        )}
      </div>
    );
  },
);

SecurePhoneNumberInput.displayName = 'SecurePhoneNumberInput';

export { SecurePhoneNumberInput };
