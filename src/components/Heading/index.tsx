import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';
import {
  cardTitleClass,
  pageTitleClass,
  sectionTitleClass,
} from '../../styles/typography';

const SIZE = {
  page: pageTitleClass,
  section: sectionTitleClass,
  card: cardTitleClass,
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The heading level for the document outline. */
  level: 1 | 2 | 3 | 4;
  /** How it looks. Defaults by level: 1 page, 2 section, 3 and 4 card. */
  size?: keyof typeof SIZE;
}

/** A title in Lernicle display type. Level and look are set apart. */
export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  const look = size ?? (level === 1 ? 'page' : level === 2 ? 'section' : 'card');

  return <Tag className={cn(SIZE[look], className)} {...props} />;
}
