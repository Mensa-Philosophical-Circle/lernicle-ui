import type { SearchableSelectProps } from './SearchableSelect.types';

import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';

import { OptionPanel } from './OptionPanel';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../primitives/popover';
import { useUIText } from '../../provider/LernicleUIProvider';
import { cn } from '../../lib/cn';

/** Over this many options the search box appears by itself. */
const SEARCH_FROM = 8;

/**
 * The one dropdown: single or multi select, a fixed list or a server search.
 * Never pre-selects anything; the caller passes `value`.
 */
export function SearchableSelect(props: SearchableSelectProps) {
  const {
    options,
    id,
    placeholder,
    disabled,
    invalid,
    className,
    searchable,
    onSearch,
    selectedOptions = [],
  } = props;
  const { t, dir } = useUIText();
  const [open, setOpen] = useState(false);
  const known = [...selectedOptions, ...options];
  const chosen = props.multiple
    ? props.value
    : props.value
      ? [props.value]
      : [];
  const labelOf = (value: string) => {
    const option = known.find((entry) => entry.value === value);

    return option?.selectedLabel ?? option?.label ?? value;
  };
  const summary =
    chosen.length > 1
      ? t('ui.select.chosen', { count: chosen.length })
      : chosen.length === 1
        ? labelOf(chosen[0])
        : (placeholder ?? t('ui.select.placeholder'));

  const choose = (value: string) => {
    if (props.multiple) {
      props.onChange(
        chosen.includes(value)
          ? chosen.filter((entry) => entry !== value)
          : [...chosen, value],
      );

      return;
    }

    props.onChange(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={invalid || undefined}
          aria-label={props['aria-label']}
          className={cn(
            'flex h-12 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 text-start font-brief-body text-[15px] leading-[22px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60',
            chosen.length === 0 && 'text-muted-foreground',
            invalid && 'border-destructive',
            className,
          )}
          disabled={disabled}
          id={id}
          // Radix adds aria-controls to the trigger once the list is open.
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          type="button"
        >
          <span className="min-w-0 truncate">{summary}</span>
          <CaretDown
            aria-hidden
            className="flex-none text-muted-foreground"
            size={16}
            weight="fill"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[--radix-popover-trigger-width] min-w-[260px] max-w-[calc(100vw-32px)] rounded-[14px] border-border bg-popover p-1.5 font-brief-body text-[15px] leading-[22px] text-foreground shadow-none"
        dir={dir}
        sideOffset={6}
      >
        <OptionPanel
          chosen={chosen}
          clearLabel={props.multiple ? undefined : props.clearLabel}
          emptyText={props.emptyText}
          isLoading={props.isLoading}
          options={options}
          renderOption={props.renderOption}
          searchPlaceholder={props.searchPlaceholder}
          showSearch={
            searchable ?? (Boolean(onSearch) || options.length > SEARCH_FROM)
          }
          typedOption={props.typedOption}
          onChoose={choose}
          onSearch={onSearch}
        />
      </PopoverContent>
    </Popover>
  );
}
