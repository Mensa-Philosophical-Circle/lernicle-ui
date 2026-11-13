import type { ReactNode } from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

/**
 * The centred "nothing here" with an icon tile, a heading, a sentence and
 * buttons. Use it for empty and no-match states that fill a whole section.
 */
export function CentredState({
  title,
  body,
  icon = <MagnifyingGlass aria-hidden size={30} weight="duotone" />,
  actions,
}: {
  title: string;
  body?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="flex flex-col items-center border-t border-border px-5 py-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-[20px] bg-secondary text-primary">
        {icon}
      </span>
      <h3 className="m-0 mt-3.5 font-brief-display text-xl font-bold leading-[26px]">
        {title}
      </h3>
      {body && (
        <p className="m-0 mt-1.5 max-w-[460px] text-muted-foreground">{body}</p>
      )}
      {actions && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
          {actions}
        </div>
      )}
    </section>
  );
}
