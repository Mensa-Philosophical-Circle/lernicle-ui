import type { DateRangeFieldProps } from '../DateFields.types';

import { DateField } from '../DateField';
import { FormField } from '../../FormField';
import { cn } from '../../../lib/cn';

/**
 * From and To. Each end limits the other, so an impossible range can't be
 * picked; choosing a From after the current To empties To.
 */
export function DateRangeField({
  value,
  onChange,
  fromLabel,
  toLabel,
  min,
  max,
  disabled,
  className,
}: DateRangeFieldProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3',
        className,
      )}
    >
      <FormField label={fromLabel}>
        <DateField
          disabled={disabled}
          label={fromLabel}
          max={max}
          min={min}
          value={value.from}
          onChange={(from) =>
            onChange({ from, to: value.to && value.to < from ? '' : value.to })
          }
        />
      </FormField>
      <FormField label={toLabel}>
        <DateField
          disabled={disabled}
          label={toLabel}
          max={max}
          min={value.from || min}
          value={value.to}
          onChange={(to) => onChange({ ...value, to })}
        />
      </FormField>
    </div>
  );
}
