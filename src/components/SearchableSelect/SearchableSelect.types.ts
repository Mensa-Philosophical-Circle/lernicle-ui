import type { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  /** Quieter text after the label. */
  hint?: string;
  /** Extra words the search should match. */
  keywords?: string;
  /** What the closed field shows, if not the label. */
  selectedLabel?: string;
  disabled?: boolean;
  /** A heading drawn above the first option that has this group. */
  group?: string;
}

interface SelectBaseProps {
  options: SelectOption[];
  id?: string;
  /** Names the field for screen readers when no visible label points at `id`. */
  'aria-label'?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  /** Show the search box. Defaults to on for more than 8 options or a server search. */
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Server search: called (debounced) with what was typed; `options` is then the reply. */
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  /** Options for chosen values that the current `options` page may not hold. */
  selectedOptions?: SelectOption[];
  /** Offers a row made from the typed text, such as a code not in the list. */
  typedOption?: (query: string) => SelectOption | null;
  /** Draws a row in place of the label and hint. */
  renderOption?: (option: SelectOption) => ReactNode;
}

export interface SingleSelectProps extends SelectBaseProps {
  multiple?: false;
  /** '' while nothing is chosen. There is no default. */
  value: string;
  onChange: (value: string) => void;
  /** Adds a row that empties the field, such as "All departments". */
  clearLabel?: string;
}

export interface MultiSelectProps extends SelectBaseProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type SearchableSelectProps = SingleSelectProps | MultiSelectProps;
