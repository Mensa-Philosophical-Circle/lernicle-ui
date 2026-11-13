import type { CSSProperties } from 'react';
import type { FiguresRowProps } from './FiguresRow.types';

import { StatusPill } from '../StatusPill';
import { cn } from '../../lib/cn';

/**
 * Key numbers between two thin lines: two across, then one row once the
 * content area is wide enough. Responds to its own width, as the sidebar moves.
 */
export function FiguresRow({
  label,
  figures,
  note,
  large,
  midColumns,
  className,
  stackOnPhone = false,
}: FiguresRowProps) {
  return (
    <div className={cn('[container-type:inline-size]', className)}>
      <section
        aria-label={label}
        className={cn(
          'grid gap-x-4 border-y border-border [@container(min-width:700px)]:[grid-template-columns:repeat(var(--figures),minmax(0,1fr))]',
          stackOnPhone
            ? 'grid-cols-1 [@container(min-width:480px)]:grid-cols-2'
            : 'grid-cols-2',
          stackOnPhone &&
            figures.length === 3 &&
            '[@container(min-width:480px)]:grid-cols-3',
          midColumns &&
            '[@container(min-width:480px)_and_(max-width:699px)]:[grid-template-columns:repeat(var(--figures-mid),minmax(0,1fr))]',
        )}
        style={
          {
            '--figures': figures.length,
            '--figures-mid': midColumns,
          } as CSSProperties
        }
      >
        {figures.map((figure) => (
          <div key={figure.label} className="min-w-0 py-4">
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-sm leading-5 text-muted-foreground">
                {figure.label}
              </span>
              {figure.action && (
                <button
                  aria-label={figure.action.ariaLabel}
                  className="-my-3 min-h-11 min-w-11 text-end font-semibold text-primary"
                  type="button"
                  onClick={figure.action.onClick}
                >
                  {figure.action.label}
                </button>
              )}
            </div>
            {figure.plain && (
              <span className="block text-sm leading-5 text-muted-foreground">
                {figure.plain}
              </span>
            )}
            <div className="mt-1">
              {figure.lines.map((line) => (
                <strong
                  key={line}
                  className={cn(
                    'block truncate font-brief-display font-bold',
                    large
                      ? 'text-[34px] leading-10 tracking-[-0.02em]'
                      : 'text-lg leading-[26px] tracking-[-0.01em] [@container(min-width:700px)]:text-[22px] [@container(min-width:700px)]:leading-[30px]',
                    figure.tone === 'bad' && 'text-destructive',
                  )}
                >
                  {line}
                </strong>
              ))}
              {figure.lines.length === 0 && figure.emptyText && (
                <span className="text-muted-foreground">
                  {figure.emptyText}
                </span>
              )}
            </div>
            {figure.sub && figure.subTone && (
              <StatusPill
                className="mt-1.5 whitespace-normal"
                label={figure.sub}
                tone={figure.subTone}
              />
            )}
            {figure.sub && !figure.subTone && (
              <span className="mt-0.5 block text-sm leading-5 text-muted-foreground">
                {figure.sub}
              </span>
            )}
          </div>
        ))}
      </section>
      {note && (
        <p className="m-0 mt-1.5 text-sm leading-5 text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}
