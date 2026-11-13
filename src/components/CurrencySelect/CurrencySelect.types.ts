export interface CurrencySelectProps {
  /** ISO 4217 code, or '' while nothing is chosen. There is no default. */
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  className?: string;
}
