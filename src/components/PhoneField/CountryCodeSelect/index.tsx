import type { Country } from 'react-phone-number-input';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { getCountryCallingCode } from 'react-phone-number-input';

import { selectContentClass } from '../../../styles/formStyles';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../primitives/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../primitives/popover';
import { useUIText } from '../../../provider/LernicleUIProvider';

interface CountryOption {
  value?: string;
  label: string;
  divider?: boolean;
}

/** "Code" until a country is chosen, then its calling code. The list itself is the browser's. */
export function CountryCodeSelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  'aria-label': ariaLabel,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  'aria-label'?: string;
}) {
  const { t } = useUIText();
  const [open, setOpen] = useState(false);
  const callingCode = (country: string) =>
    `+${getCountryCallingCode(country as Country)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          aria-label={ariaLabel}
          className="flex h-12 w-24 flex-none items-center justify-between gap-1 rounded-xl border border-border bg-card px-3 font-brief-body text-[15px] disabled:opacity-60"
          disabled={disabled || readOnly}
          type="button"
        >
          <span className="truncate" dir="ltr">
            {value ? callingCode(value) : t('ui.phone.code')}
          </span>
          <CaretDown
            aria-hidden="true"
            className="flex-none text-muted-foreground"
            size={16}
            weight="fill"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`w-72 p-0 ${selectContentClass}`}
      >
        <Command>
          <CommandInput placeholder={t('ui.search.typeToSearch')} />
          <CommandList>
            {options
              .filter((option) => !option.divider && option.value)
              .map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${callingCode(option.value as string)}`}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {`${option.label} (${callingCode(option.value as string)})`}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
