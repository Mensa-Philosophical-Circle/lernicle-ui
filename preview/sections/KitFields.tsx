import { useState } from 'react';

import { PREVIEW_OPTIONS } from '../previewData';
import { ChoiceGroup, CountrySelect, CurrencySelect, DateField, DateRangeField, FormField, FormSection, LanguageSelect, MonthField, SearchableSelect, TimeField, TimezoneSelect } from '../../src/fields';
import { fieldGridClass } from '../../src';
import { PhoneField } from '../../src/phone';

export function KitFields() {
  const [one, setOne] = useState('');
  const [many, setMany] = useState<string[]>([]);
  const [text, setText] = useState({
    currency: '',
    country: '',
    zone: '',
    language: '',
    role: '',
    phone: '',
    day: '',
    month: '',
    time: '',
    choice: 'a',
  });
  const [range, setRange] = useState({ from: '', to: '' });
  const put = (key: keyof typeof text) => (value: string) =>
    setText((now) => ({ ...now, [key]: value }));

  return (
    <div>
      <FormSection note="Single, multi, and the ready-made pickers." title="Dropdowns">
        <div className={fieldGridClass}>
          <FormField label="Department">
            <SearchableSelect clearLabel="All departments" options={PREVIEW_OPTIONS} value={one} onChange={setOne} />
          </FormField>
          <FormField label="Departments (many)">
            <SearchableSelect multiple options={PREVIEW_OPTIONS} value={many} onChange={setMany} />
          </FormField>
          <FormField label="Currency">
            <CurrencySelect value={text.currency} onChange={put('currency')} />
          </FormField>
          <FormField label="Country">
            <CountrySelect value={text.country} onChange={put('country')} />
          </FormField>
          <FormField label="Time zone">
            <TimezoneSelect value={text.zone} onChange={put('zone')} />
          </FormField>
          <FormField label="Language">
            <LanguageSelect value={text.language} onChange={put('language')} />
          </FormField>
          <FormField hint="No country chosen in advance." label="Phone">
            <PhoneField label="Phone" value={text.phone} onChange={put('phone')} />
          </FormField>
        </div>
      </FormSection>
      <FormSection last note="All open centred pop-ups or searchable lists." title="Dates and times">
        <div className={fieldGridClass}>
          <FormField required label="Date">
            <DateField label="Date" value={text.day} onChange={put('day')} />
          </FormField>
          <FormField label="Month">
            <MonthField label="Month" value={text.month} onChange={put('month')} />
          </FormField>
          <FormField error="Choose a time" label="Time">
            <TimeField invalid aria-label="Time" value={text.time} onChange={put('time')} />
          </FormField>
        </div>
        <DateRangeField fromLabel="From" toLabel="To" value={range} onChange={setRange} />
        <ChoiceGroup
          label="Choice"
          options={[
            { value: 'a', label: 'Yes' },
            { value: 'b', label: 'No' },
          ]}
          value={text.choice}
          onChange={put('choice')}
        />
      </FormSection>
    </div>
  );
}
