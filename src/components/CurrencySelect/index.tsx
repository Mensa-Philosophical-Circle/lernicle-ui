import type { CurrencySelectProps } from './CurrencySelect.types';

import { useMemo } from 'react';

import { SearchableSelect } from '../SearchableSelect';
import {
  currencyDisplayName,
  isCurrencyCode,
  listCurrencyOptions,
} from '../../format/currencyList';
import { useUIFormat } from '../../provider/LernicleUIProvider';
import { useUIText } from '../../provider/LernicleUIProvider';

/**
 * A searchable list of every currency the platform knows, named in the
 * reader's language. Nothing is pre-selected here: the caller passes the
 * school's own currency as `value` when it has one.
 */
export function CurrencySelect({
  value,
  onChange,
  disabled,
  id,
  invalid,
  className,
}: CurrencySelectProps) {
  const { t } = useUIText();
  const { locale } = useUIFormat();
  const options = useMemo(
    () =>
      listCurrencyOptions(locale).map(({ code, name }) => ({
        value: code,
        label: code,
        hint: name,
        selectedLabel: `${code} · ${name}`,
      })),
    [locale],
  );
  const code = value.toUpperCase();

  return (
    <SearchableSelect
      className={className}
      disabled={disabled}
      emptyText={t('ui.currency.none')}
      id={id}
      invalid={invalid}
      options={options}
      placeholder={t('ui.currency.select')}
      searchPlaceholder={t('ui.currency.search')}
      searchable
      selectedOptions={
        code
          ? [
              {
                value: code,
                label: code,
                selectedLabel: `${code} · ${currencyDisplayName(code, locale)}`,
              },
            ]
          : []
      }
      // Engines without Intl.supportedValuesOf: let the person type the code.
      typedOption={(query) => {
        const typed = query.toUpperCase();

        return isCurrencyCode(typed) &&
          !options.some((option) => option.value === typed)
          ? { value: typed, label: t('ui.currency.useCode', { code: typed }) }
          : null;
      }}
      value={code}
      onChange={onChange}
    />
  );
}
