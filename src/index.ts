// The provider, styles and page pieces. Fields, dialogs, charts, lists and
// format helpers have their own entries, so an app only loads what it uses.
export { cn } from './lib/cn';
export { useDebounce } from './lib/useDebounce';
export { useFocusOnMount } from './lib/useFocusOnMount';
export * from './styles/formStyles';
export * from './styles/typography';

export {
  LernicleUIProvider,
  useUI,
  useUIFormat,
  useUIText,
  type LernicleUIProviderProps,
  type UIContextValue,
  type UILinkProps,
  type UINotice,
  type UINotifyTone,
} from './provider/LernicleUIProvider';
export {
  createDefaultFormatters,
  type UIFormatters,
  type UIMoneyOptions,
  type UINumberOptions,
  type UIPercentOptions,
} from './provider/defaultFormatters';
export { UI_LANGUAGES, type UILanguage } from './i18n/catalogues';
export type { UICatalogue, UITextKey } from './i18n/en';
export type { TextParams } from './i18n/interpolate';
export type { UITranslate } from './i18n/translate';

export { BankLockPanel } from './components/BankLockPanel';
export { Button, type ButtonProps, type ButtonTone } from './components/Button';
export { Heading, type HeadingProps } from './components/Heading';
export { CentredState } from './components/CentredState';
export {
  DeletedPeopleList,
} from './components/DeletedPeopleList';
export type {
  DeletedPeopleLabels,
  DeletedPeopleListProps,
  DeletedPerson,
} from './components/DeletedPeopleList/DeletedPeopleList.types';
export {
  DetailSection,
  type DetailRow,
  type DetailSectionProps,
} from './components/DetailSection';
export { ErrorAlert, type ErrorAlertProps } from './components/ErrorAlert';
export { ExportButton } from './components/ExportButton';
export { FiguresRow } from './components/FiguresRow';
export type { Figure, FiguresRowProps } from './components/FiguresRow/FiguresRow.types';
export { ListToolbar } from './components/ListToolbar';
export { FilterPopover } from './components/ListToolbar/FilterPopover';
export { SearchBox } from './components/ListToolbar/SearchBox';
export type {
  FilterPopoverProps,
  ListToolbarProps,
  SearchBoxProps,
} from './components/ListToolbar/ListToolbar.types';
export { MoneyTotals } from './components/MoneyTotals';
export type { MoneyTotalsProps } from './components/MoneyTotals/MoneyTotals.types';
export {
  ListSkeleton,
  NoMatches,
  PageError,
  PageNote,
  StatePanel,
} from './components/PageStates';
export { InlineError } from './components/PageStates/InlineError';
export type {
  PageErrorProps,
  PageNoteProps,
  StatePanelProps,
} from './components/PageStates/PageStates.types';
export { Pager } from './components/Pager';
export type { PagerProps } from './components/Pager/Pager.types';
export { bandActionClass, PersonAvatar, PersonBand } from './components/PersonBand';
export { RowMenu, type RowMenuItem } from './components/RowMenu';
export { SaveBar } from './components/SaveBar';
export { SaveButton } from './components/SaveButton';
export type { SaveButtonProps } from './components/SaveButton/SaveButton.types';
export { SelectionBar } from './components/SelectionBar';
export { SplitActionButton, splitPrimaryClass } from './components/SplitActionButton';
export { StatusPill, type StatusTone } from './components/StatusPill';
export { TopToast } from './components/TopToast';
export { UnderlineTabs } from './components/UnderlineTabs';
export { ViewOnlyNote, type ViewOnlyReason } from './components/ViewOnlyNote';
export { WayCard, wayActionClass } from './components/WayCard';
