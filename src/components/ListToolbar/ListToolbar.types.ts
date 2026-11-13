import type { ReactNode } from 'react';

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  /** Names the box for screen readers. */
  label: string;
  placeholder?: string;
  className?: string;
}

export interface FilterPopoverProps {
  /** How many filters are on; shows as a count on the button. */
  count: number;
  /** "12 records match". */
  matchText?: string;
  onClear?: () => void;
  /** Adds a footer with Reset and this Done button, which closes the pop-over. */
  doneLabel?: string;
  /** The footer's reset wording, when `doneLabel` is given. */
  resetLabel?: string;
  width?: number;
  children: ReactNode;
}

export interface ListToolbarProps extends SearchBoxProps {
  /** Filter pop-over and buttons, after the search box. */
  children?: ReactNode;
}
