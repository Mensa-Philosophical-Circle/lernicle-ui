import type { ReactNode } from 'react';
import type { SelectOption } from '../SearchableSelect.types';

export interface OptionPanelProps {
  options: SelectOption[];
  chosen: string[];
  showSearch: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  isLoading?: boolean;
  clearLabel?: string;
  typedOption?: (query: string) => SelectOption | null;
  renderOption?: (option: SelectOption) => ReactNode;
  onSearch?: (query: string) => void;
  onChoose: (value: string) => void;
}
