/**
 * Lernicle type, the same in every app. Sizes come from the owner app's
 * Morning Brief screens. Display type is for titles; body type for the rest.
 * The fonts themselves are set by the package's Tailwind preset or theme file
 * and loaded by `@lernicle/ui/fonts.css`.
 */

/** Body text on every screen; dialogs and menus render in portals, so they repeat it. */
export const bodyTextClass =
  'font-brief-body text-[15px] leading-[22px] text-foreground';

/** The one title of a page. */
export const pageTitleClass =
  'm-0 font-brief-display text-[26px] font-bold leading-[30px] tracking-[-0.02em]';

/** A section inside a page. */
export const sectionTitleClass =
  'm-0 font-brief-display text-[21px] font-bold leading-[27px]';

/** A card, panel or dialog title. */
export const cardTitleClass =
  'm-0 font-brief-display text-[17px] font-bold leading-[22px]';

/** A small heading above a group, such as a column of figures. */
export const eyebrowClass =
  'm-0 font-brief-body text-[13px] font-semibold leading-[18px] text-muted-foreground';

/** Secondary text: a hint, a caption, a date under a name. */
export const mutedTextClass = 'text-sm leading-5 text-muted-foreground';

/** The words above a field. */
export const fieldLabelClass = 'text-sm font-semibold leading-5';
