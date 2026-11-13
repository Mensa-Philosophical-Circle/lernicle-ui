import type { DeletedPeopleListProps } from './DeletedPeopleList.types';

import { DeletedPersonRow } from './DeletedPersonRow';
import {
  BY_COLUMN,
  DATE_COLUMN,
  DETAIL_COLUMN,
  HEADER_ROW,
  LEFT_COLUMN,
} from './deletedPeopleStyles';

/** Everyone who can still be restored, with how long is left. */
export function DeletedPeopleList({
  people,
  labels,
  onRestore,
}: DeletedPeopleListProps) {
  return (
    <section
      aria-label={labels.section}
      className="[container-type:inline-size]"
    >
      <div
        className={`${HEADER_ROW} gap-4 px-2 pb-2 text-sm leading-5 text-muted-foreground`}
      >
        <span className="min-w-0 flex-1">{labels.name}</span>
        <span className={DETAIL_COLUMN}>{labels.detail}</span>
        <span className={DATE_COLUMN}>{labels.deleted}</span>
        <span className={BY_COLUMN}>{labels.by}</span>
        <span className={LEFT_COLUMN}>{labels.timeLeft}</span>
        <span className="w-[92px] flex-none" />
      </div>
      {people.length === 0 ? (
        <p className="m-0 border-t border-border px-2 py-7 text-center text-muted-foreground">
          {labels.empty}
        </p>
      ) : (
        <ul className="m-0 list-none p-0">
          {people.map((person) => (
            <DeletedPersonRow
              key={person.id}
              labels={labels}
              person={person}
              onRestore={onRestore && (() => onRestore(person.id))}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
