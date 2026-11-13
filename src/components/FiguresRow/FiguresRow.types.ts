import type { StatusTone } from '../StatusPill';

export interface Figure {
  label: string;
  /** One line per currency, or a single number. Never add currencies together. */
  lines: string[];
  /** A quieter line under the figure. */
  sub?: string;
  /** Draws `sub` as a coloured pill, such as "Up 12% from last period". */
  subTone?: StatusTone;
  /** A plain explanation under the label. */
  plain?: string;
  /** Shown when `lines` is empty, such as "None in this view". */
  emptyText?: string;
  /** `bad` colours the number, for a figure below the school's line. */
  tone?: 'bad';
  /** "View" link beside the label. */
  action?: { label: string; ariaLabel?: string; onClick: () => void };
}

export interface FiguresRowProps {
  /** Names the row for screen readers. */
  label: string;
  figures: Figure[];
  /** Report-sized numbers, 34px. */
  large?: boolean;
  /** How many across on a tablet (a content area from 480 to 699px wide). */
  midColumns?: number;
  /** One to a row on a phone, instead of two across. */
  stackOnPhone?: boolean;
  /** A short note below, such as what the totals cover. */
  note?: string;
  className?: string;
}
