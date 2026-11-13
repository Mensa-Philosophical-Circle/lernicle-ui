import type { RegionSelectProps } from './RegionSelects.types';

import { useMemo } from 'react';

import { SearchableSelect } from '../SearchableSelect';
import { useUIFormat } from '../../provider/LernicleUIProvider';
import {
  listCountryOptions,
  listTimeZoneOptions,
} from '../../format/regionOptions';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES } from '../../format/languages';
import { useUIText } from '../../provider/LernicleUIProvider';

/** Every country, named in the reader's language. Value: ISO code, upper case. */
export function CountrySelect(props: RegionSelectProps) {
  const { t } = useUIText();
  const { locale } = useUIFormat();
  const options = useMemo(() => listCountryOptions(locale), [locale]);

  return (
    <SearchableSelect
      {...props}
      searchable
      options={options}
      placeholder={t('ui.select.country')}
    />
  );
}

/** Every time zone, by city and current offset. Value: IANA name. */
export function TimezoneSelect(props: RegionSelectProps) {
  const { t } = useUIText();
  const options = useMemo(() => listTimeZoneOptions(), []);

  return (
    <SearchableSelect
      {...props}
      searchable
      options={options}
      placeholder={t('ui.select.timezone')}
    />
  );
}

const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map((code) => ({
  value: code,
  label: LANGUAGE_NAMES[code],
}));

/** The languages the app ships, each in its own language. Value: language code. */
export function LanguageSelect(props: RegionSelectProps) {
  const { t } = useUIText();

  return (
    <SearchableSelect
      {...props}
      options={LANGUAGE_OPTIONS}
      placeholder={t('ui.select.language')}
    />
  );
}

