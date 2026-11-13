import type { TimeFieldProps } from '../DateFields.types';

import { useMemo } from 'react';

import { SearchableSelect } from '../../SearchableSelect';
import { useUIFormat } from '../../../provider/LernicleUIProvider';
import { useUIText } from '../../../provider/LernicleUIProvider';
import {
  clockTimes,
  formatClockTime,
  parseTypedTime,
} from '../../../format/timeOptions';

/** A time from a list, or any time typed in. Value is `HH:mm`. */
export function TimeField({
  value,
  onChange,
  stepMinutes = 15,
  placeholder,
  ...field
}: TimeFieldProps) {
  const { t } = useUIText();
  const { locale } = useUIFormat();
  const options = useMemo(
    () =>
      clockTimes(stepMinutes).map((time) => ({
        value: time,
        label: formatClockTime(time, locale),
      })),
    [stepMinutes, locale],
  );

  return (
    <SearchableSelect
      {...field}
      searchable
      emptyText={t('ui.time.hint')}
      options={options}
      placeholder={placeholder ?? t('ui.time.choose')}
      searchPlaceholder={t('ui.time.type')}
      selectedOptions={
        value ? [{ value, label: formatClockTime(value, locale) }] : []
      }
      typedOption={(query) => {
        const time = parseTypedTime(query);

        return time && !options.some((option) => option.value === time)
          ? { value: time, label: formatClockTime(time, locale) }
          : null;
      }}
      value={value}
      onChange={onChange}
    />
  );
}
