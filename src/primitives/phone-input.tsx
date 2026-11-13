import * as React from 'react';
import PhoneInput from 'react-phone-number-input';

import { Input } from './input';

import { cn } from '../lib/cn';

const PhoneInputComponent = React.forwardRef<
  React.ElementRef<typeof PhoneInput>,
  React.ComponentPropsWithoutRef<typeof PhoneInput>
>(({ className, onChange, ...props }, ref) => {
  return (
    <PhoneInput
      ref={ref}
      className={cn(
        'flex gap-2',
        // The library's country picker is a bare flag; box it like the input
        // beside it so it reads as a control in both themes.
        '[&_.PhoneInputCountry]:m-0 [&_.PhoneInputCountry]:self-stretch [&_.PhoneInputCountry]:rounded-md [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-input [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
        '[&_.PhoneInputCountry:focus-within]:ring-1 [&_.PhoneInputCountry:focus-within]:ring-ring',
        '[&_.PhoneInputCountryIcon--border]:bg-transparent [&_.PhoneInputCountryIcon--border]:shadow-none [&_.PhoneInputCountryIcon]:text-muted-foreground',
        '[&_.PhoneInputCountrySelectArrow]:text-muted-foreground [&_.PhoneInputCountrySelectArrow]:opacity-100',
        className,
      )}
      inputComponent={Input}
      onChange={onChange}
      {...props}
    />
  );
});

PhoneInputComponent.displayName = 'PhoneInput';

export { PhoneInputComponent as PhoneInput };
