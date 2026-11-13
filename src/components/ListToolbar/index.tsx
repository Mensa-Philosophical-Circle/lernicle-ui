import type { ListToolbarProps } from './ListToolbar.types';

import { SearchBox } from './SearchBox';

/** Search on the left, filter and actions after it, wrapping when narrow. */
export function ListToolbar({ children, ...search }: ListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchBox {...search} />
      {children}
    </div>
  );
}
