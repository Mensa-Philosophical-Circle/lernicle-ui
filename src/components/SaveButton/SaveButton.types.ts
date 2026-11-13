export interface SaveButtonProps {
  label: string;
  /** Shown while saving; "Working…" when left out. */
  busyLabel?: string;
  busy?: boolean;
  disabled?: boolean;
  onClick: () => void;
}
