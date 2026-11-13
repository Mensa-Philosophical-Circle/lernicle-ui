import { segmentClass } from '../../styles/formStyles';
import { Button } from '../../primitives/button';
import { cn } from '../../lib/cn';

/** A row of mutually exclusive choices. */
export function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  look = 'track',
}: {
  label: string;
  value: T | undefined;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  /** `buttons`: separate outlined buttons, two across on a phone, for a period or a currency. */
  look?: 'track' | 'buttons';
}) {
  if (look === 'buttons') {
    return (
      <div
        aria-label={label}
        className="grid max-w-full grid-cols-2 gap-1.5 sm:inline-grid sm:grid-flow-col sm:grid-cols-none"
        role="group"
      >
        {options.map((option) => (
          <Button
            key={option.value}
            aria-pressed={option.value === value}
            className={cn(
              'h-auto min-h-12 whitespace-nowrap rounded-xl border px-3.5 text-[15px] font-semibold leading-[22px] shadow-none',
              option.value === value
                ? 'border-primary bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground'
                : 'border-border bg-card text-foreground hover:bg-muted hover:text-foreground',
            )}
            type="button"
            variant="ghost"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-label={label}
      className="inline-flex max-w-full flex-wrap gap-0.5 self-start rounded-[13px] bg-muted p-[3px]"
      role="group"
    >
      {options.map((option) => (
        <Button
          key={option.value}
          aria-pressed={option.value === value}
          className={cn(
            segmentClass,
            option.value === value
              ? 'bg-card text-secondary-foreground hover:bg-card hover:text-secondary-foreground'
              : 'text-muted-foreground hover:bg-transparent hover:text-foreground',
          )}
          type="button"
          variant="ghost"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
