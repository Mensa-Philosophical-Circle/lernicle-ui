import type { OptionPanelProps } from './OptionPanel.types';
import type { SelectOption } from '../SearchableSelect.types';

import { Check, MagnifyingGlass } from '@phosphor-icons/react';
import { Command as CommandPrimitive } from 'cmdk';
import { Fragment, useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../../../primitives/command';
import { useDebounce } from '../../../lib/useDebounce';
import { useUIText } from '../../../provider/LernicleUIProvider';
import { cn } from '../../../lib/cn';

const ROW =
  'min-h-11 rounded-[10px] px-3 py-[9px] text-[15px] leading-[22px] data-[selected=true]:bg-muted data-[selected=true]:text-foreground';
const ROW_ON =
  'bg-secondary font-semibold text-secondary-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground';

/** Search box and list inside the dropdown. Mounted only while it is open. */
export function OptionPanel({
  options,
  chosen,
  showSearch,
  searchPlaceholder,
  emptyText,
  isLoading,
  clearLabel,
  typedOption,
  renderOption,
  onSearch,
  onChoose,
}: OptionPanelProps) {
  const { t } = useUIText();
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query.trim(), 300);
  const typed = query.trim() ? (typedOption?.(query.trim()) ?? null) : null;

  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced, onSearch]);

  const row = (option: SelectOption, searchValue: string) => {
    const on = chosen.includes(option.value);

    return (
      <CommandItem
        key={option.value}
        aria-selected={on}
        className={cn(ROW, on && ROW_ON)}
        disabled={option.disabled}
        value={searchValue}
        onSelect={() => onChoose(option.value)}
      >
        {renderOption ? (
          renderOption(option)
        ) : (
          <span className="min-w-0 flex-1 truncate">
            {option.label}
            {option.hint && (
              <span className="ms-2 font-normal text-muted-foreground">
                {option.hint}
              </span>
            )}
          </span>
        )}
        {on && (
          <Check aria-hidden className="flex-none" size={16} weight="bold" />
        )}
      </CommandItem>
    );
  };

  return (
    <Command
      className="bg-transparent text-inherit"
      filter={(value, search) =>
        value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0
      }
      shouldFilter={!onSearch}
    >
      {showSearch && (
        <div className="mb-1.5 flex h-11 items-center gap-2 rounded-[10px] border border-border px-2.5 text-muted-foreground focus-within:ring-2 focus-within:ring-ring">
          <MagnifyingGlass aria-hidden className="flex-none" size={18} />
          <CommandPrimitive.Input
            aria-label={searchPlaceholder ?? t('ui.select.search')}
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] leading-[22px] text-foreground outline-none placeholder:text-muted-foreground"
            placeholder={searchPlaceholder ?? t('ui.select.search')}
            value={query}
            onValueChange={setQuery}
          />
        </div>
      )}
      <CommandList className="max-h-[232px]">
        {!isLoading && (
          <CommandEmpty className="px-3 py-2.5 text-sm leading-5 text-muted-foreground">
            {emptyText ?? t('ui.select.none')}
          </CommandEmpty>
        )}
        {isLoading && (
          <p
            className="m-0 px-3 py-2.5 text-sm leading-5 text-muted-foreground"
            role="status"
          >
            {t('ui.select.loading')}
          </p>
        )}
        <CommandGroup className="p-0">
          {clearLabel &&
            !query &&
            row({ value: '', label: clearLabel }, `__clear ${clearLabel}`)}
          {typed && row(typed, `${typed.value} ${query}`)}
          {options.map((option, index) => (
            <Fragment key={option.value}>
              {option.group &&
                option.group !== options[index - 1]?.group &&
                !query && (
                  <p className="m-0 px-3 pb-1 pt-2.5 text-[13px] font-semibold leading-[18px] text-muted-foreground">
                    {option.group}
                  </p>
                )}
              {row(
                option,
                `${option.value} ${option.label} ${option.hint ?? ''} ${option.keywords ?? ''}`,
              )}
            </Fragment>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
