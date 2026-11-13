export interface PickerFieldProps {
  /** Names the field and titles its pop-up. */
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

export interface DateFieldProps extends PickerFieldProps {
  /** `YYYY-MM-DD`, or '' while nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  /** Earliest and latest day that can be picked, `YYYY-MM-DD`. */
  min?: string;
  max?: string;
}

export interface DateRangeValue {
  from: string;
  to: string;
}

export interface DateRangeFieldProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  fromLabel: string;
  toLabel: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
}

export interface MonthFieldProps extends PickerFieldProps {
  /** `YYYY-MM`, or '' while nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export interface TimeFieldProps {
  /** `HH:mm`, or '' while nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  id?: string;
  'aria-label'?: string;
  placeholder?: string;
  /** Minutes between the listed times. Any time can still be typed. */
  stepMinutes?: number;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}
