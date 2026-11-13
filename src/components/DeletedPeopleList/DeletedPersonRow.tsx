import type {
  DeletedPeopleLabels,
  DeletedPerson,
} from './DeletedPeopleList.types';

import {
  BY_COLUMN,
  DATE_COLUMN,
  DETAIL_COLUMN,
  LEFT_COLUMN,
  RESTORE_BUTTON,
  SUB_FULL,
  SUB_PHONE,
  SUB_TABLET,
} from './deletedPeopleStyles';

import { PersonAvatar } from '../PersonBand';

const URGENT_DAYS = 7;
const URGENT_TEXT = 'font-semibold text-destructive';

export function DeletedPersonRow({
  person,
  labels,
  onRestore,
}: {
  person: DeletedPerson;
  labels: DeletedPeopleLabels;
  onRestore?: () => void;
}) {
  const urgent = person.daysLeft <= URGENT_DAYS;

  return (
    <li className="flex min-h-[68px] items-center gap-4 border-t border-border p-2">
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <PersonAvatar quiet name={person.name} photoUrl={person.photoUrl} />
        <span className="min-w-0">
          <strong className="block truncate font-semibold">
            {person.name}
          </strong>
          <span className="block text-sm leading-5 text-muted-foreground">
            <span className={SUB_PHONE}>
              <bdi>{person.detail}</bdi>
              {' · '}
              <span className={urgent ? URGENT_TEXT : undefined}>
                {labels.daysLeft(person.daysLeft)}
              </span>
            </span>
            <span className={SUB_TABLET}>
              <bdi>{person.detail}</bdi>
              {' · '}
              {labels.deletedOn(person.deletedOn)}
            </span>
            <span className={SUB_FULL}>{person.code}</span>
          </span>
        </span>
      </span>
      <span className={DETAIL_COLUMN}>{person.detail}</span>
      <span className={`${DATE_COLUMN} text-muted-foreground`}>
        {person.deletedOn}
      </span>
      <span className={`${BY_COLUMN} text-muted-foreground`}>{person.by}</span>
      <span
        className={`${LEFT_COLUMN} ${urgent ? URGENT_TEXT : 'text-muted-foreground'}`}
      >
        {labels.days(person.daysLeft)}
      </span>
      {onRestore && (
        <button
          aria-label={labels.restoreName(person.name)}
          className={RESTORE_BUTTON}
          type="button"
          onClick={onRestore}
        >
          {labels.restore}
        </button>
      )}
    </li>
  );
}
