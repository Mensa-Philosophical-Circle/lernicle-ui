import type { DateFieldProps } from '../DateFields.types';

import { CalendarBlank } from '@phosphor-icons/react';
import { useState } from 'react';

import { CalendarPopup } from '../CalendarPopup';
import { PickerTrigger } from '../PickerTrigger';
import { useUIFormat } from '../../../provider/LernicleUIProvider';
import { useUIText } from '../../../provider/LernicleUIProvider';
import { formatIsoDay } from '../../../format/calendarGrid';

/** A date, picked in a centred calendar. Value is `YYYY-MM-DD`; nothing is chosen in advance. */
export function DateField({
  value,
  onChange,
  min,
  max,
  placeholder,
  ...field
}: DateFieldProps) {
  const { t } = useUIText();
  const { locale } = useUIFormat();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PickerTrigger
        {...field}
        chosen={Boolean(value)}
        icon={CalendarBlank}
        text={
          value
            ? formatIsoDay(value, locale)
            : (placeholder ?? t('ui.date.choose'))
        }
        onOpen={() => setOpen(true)}
      />
      {open && (
        <CalendarPopup
          max={max}
          min={min}
          title={field.label}
          value={value}
          onClose={() => setOpen(false)}
          onPick={(iso) => {
            onChange(iso);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
