export interface RegionSelectProps {
  /** '' while nothing is chosen. There is no default. */
  value: string;
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  'aria-label'?: string;
  /** Adds a first row that empties the field, such as "Follow the browser". */
  clearLabel?: string;
}
