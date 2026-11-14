import { bodyTextClass, cardTitleClass, fieldLabelClass } from './typography';

/** The controls every Lernicle screen shares. Theme tokens only. */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

const buttonBase = `h-auto whitespace-normal text-[15px] leading-[22px] shadow-none transition-colors disabled:pointer-events-none disabled:opacity-50 ${focusRing}`;

/** Morning Brief type on every screen; dialogs and menus render in portals, so they repeat it. */
export const briefTextClass = bodyTextClass;

export const fieldInputClass =
  'block h-12 w-full rounded-xl border border-border bg-card px-3.5 text-[15px] leading-[22px] shadow-none placeholder:text-muted-foreground md:text-[15px] focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-calendar-picker-indicator]:ms-auto';

/** Replaces a dropdown's stock icon with the design's one downward caret, in the theme's muted colour. */
export const selectCaretClass =
  "[&>svg]:hidden after:size-4 after:shrink-0 after:bg-muted-foreground after:content-[''] after:[mask:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20256%20256%27%3E%3Cpath%20d=%27M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94Z%27/%3E%3C/svg%3E)_center/contain_no-repeat]";

export const fieldTriggerClass = `h-12 w-full justify-between rounded-xl border border-border bg-card px-3.5 text-[15px] font-normal leading-[22px] text-foreground shadow-none hover:bg-card hover:text-foreground ${selectCaretClass}`;

/** The open list of a dropdown: the same panel as the row menus. */
export const selectContentClass =
  'rounded-[14px] border-border bg-popover p-1.5 font-brief-body text-foreground shadow-none [&_[role=option]]:min-h-11 [&_[role=option]]:rounded-lg [&_[role=option]]:text-[15px] [&_[role=option]]:leading-[22px]';

/** Inside the 96px country-code control the library's own picker is replaced. */
export const phoneFieldClass =
  'gap-1.5 [&_input]:h-12 [&_input]:rounded-xl [&_input]:border-border [&_input]:bg-card [&_input]:px-3.5 [&_input]:text-[15px] [&_input]:leading-[22px] [&_input]:shadow-none md:[&_input]:text-[15px] [&_input]:focus-visible:ring-2';

// 48px, 12px corners and 20px sides, as every Morning Brief design draws it.
export const primaryButtonClass = `${buttonBase} min-h-12 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground`;

/** Kept for existing callers: the same as primaryButtonClass. */
export const dialogPrimaryButtonClass = primaryButtonClass;

export const secondaryButtonClass = `${buttonBase} min-h-12 rounded-xl border border-border bg-card px-[18px] font-semibold text-foreground hover:bg-muted hover:text-foreground`;

export const quietButtonClass = `${buttonBase} min-h-12 rounded-xl px-3.5 font-semibold text-muted-foreground hover:bg-transparent hover:text-foreground`;

/** A link that looks like the main button. */
export const primaryLinkClass = `inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 font-bold text-primary-foreground no-underline hover:bg-primary/90 ${focusRing} focus-visible:ring-offset-2`;

export const dangerButtonClass = `${buttonBase} min-h-12 rounded-xl bg-destructive px-5 font-bold text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground`;

export const linkButtonClass = `${buttonBase} min-h-11 rounded-md px-0 font-semibold text-primary hover:bg-transparent hover:text-primary hover:underline`;

export const dangerLinkButtonClass = `${buttonBase} min-h-11 rounded-md px-0 font-semibold text-destructive hover:bg-transparent hover:text-destructive hover:underline`;

export const checkboxClass =
  'mt-px h-5 w-5 shrink-0 rounded-[5px] border-muted-foreground shadow-none data-[state=checked]:border-primary';

/** 42px like the design; the hit area reaches over the track's padding to stay above 44px. */
export const segmentClass =
  "relative h-auto min-h-[42px] whitespace-normal rounded-[10px] px-4 text-[15px] font-semibold leading-[22px] shadow-none after:absolute after:inset-x-0 after:-inset-y-[3px] after:content-['']";

export const dialogActionsClass = 'mt-5 flex flex-wrap justify-end gap-2';

export const labelClass = fieldLabelClass;

export const formErrorClass = 'text-sm leading-5 text-destructive';

export const fieldHintClass = 'text-sm leading-5 text-muted-foreground';

export const fieldGridClass =
  'grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4';

/** The panel and rows of a list's ⋯ and split-button menus. */
export const menuPanelClass =
  'min-w-[180px] rounded-[14px] border-border bg-popover p-1.5 font-brief-body text-foreground shadow-none';

export const menuItemClass =
  'cursor-pointer rounded-lg px-3 py-[11px] text-[15px] leading-[22px]';

/** Same box on the header row, so columns line up; the hit area is 44px. */
export const rowCheckboxClass =
  'relative h-5 w-5 flex-none rounded-[5px] border-muted-foreground shadow-none data-[state=checked]:border-primary after:absolute after:-inset-3 after:content-[""]';

/** A link that looks like the secondary button. */
export const secondaryLinkClass =
  'inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-4 font-semibold text-foreground no-underline hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/** Rounded tabs at the top of a person's profile. */
export const pillTabsListClass =
  'flex h-auto w-full justify-start gap-1.5 overflow-x-auto rounded-none bg-transparent p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const pillTabClass =
  'min-h-11 flex-none rounded-[14px] bg-muted px-4 text-[15px] font-semibold leading-[22px] text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none';

/** A titled block of details. */
export const detailCardClass =
  'min-w-0 rounded-[20px] border border-border bg-card px-5 py-[18px]';

export const detailTitleClass = `${cardTitleClass} mb-1.5`;

export const detailGridClass =
  'grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-3';

/** Every section page: gutters and Morning Brief type. */
export const pageBodyClass = `flex min-w-0 flex-col gap-4 px-3.5 pb-5 pt-2 md:px-6 ${briefTextClass}`;
