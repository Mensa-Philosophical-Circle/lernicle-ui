import { fieldInputClass } from '../../styles/formStyles';
import { Input } from '../../primitives/input';
import { cn } from '../../lib/cn';

/**
 * An amount with its currency code in front. Plain text with the decimal
 * keypad, so nothing is rounded while typing. Parse with `amountText`.
 */
export function AmountField({
  id,
  value,
  onChange,
  currency,
  invalid,
  disabled,
  placeholder = '0.00',
  'aria-label': ariaLabel,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  'aria-label'?: string;
}) {
  return (
    <div className="relative">
      {currency && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-3.5 flex items-center text-[15px] font-semibold text-muted-foreground"
        >
          {currency}
        </span>
      )}
      <Input
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        autoComplete="off"
        className={cn(fieldInputClass, currency && 'ps-14 tabular-nums')}
        disabled={disabled}
        id={id}
        inputMode="decimal"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
