import { CountryCodeSelect } from './CountryCodeSelect';
import { phoneFieldClass } from '../../styles/formStyles';
import { SecurePhoneNumberInput } from '../../secure/secure-phone-input';
import { useUIText } from '../../provider/LernicleUIProvider';

/** A phone number with a country code picker and no country chosen in advance. */
export function PhoneField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id?: string;
  label: string;
  value: string | undefined;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const { t } = useUIText();

  return (
    <SecurePhoneNumberInput
      aria-label={label}
      className={phoneFieldClass}
      countrySelectComponent={CountryCodeSelect}
      countrySelectProps={{ 'aria-label': t('ui.phone.countryCode') }}
      id={id}
      placeholder={placeholder ?? t('ui.phone.placeholder')}
      strictValidation={false}
      value={value}
      onChange={(next: string | undefined) => onChange(next || '')}
    />
  );
}
