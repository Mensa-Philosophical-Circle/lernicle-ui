export interface DeletedPerson {
  id: string;
  name: string;
  photoUrl?: string | null;
  /** Pupil or employee ID. */
  code: string;
  /** Their class or role. */
  detail: string;
  /** Already formatted. */
  deletedOn: string;
  by: string;
  daysLeft: number;
}

/** Every word comes from the section, already translated. */
export interface DeletedPeopleLabels {
  section: string;
  name: string;
  detail: string;
  deleted: string;
  by: string;
  timeLeft: string;
  empty: string;
  restore: string;
  restoreName: (name: string) => string;
  days: (count: number) => string;
  daysLeft: (count: number) => string;
  deletedOn: (date: string) => string;
}

export interface DeletedPeopleListProps {
  people: DeletedPerson[];
  labels: DeletedPeopleLabels;
  /** Leave out when this login can't restore: the buttons are hidden. */
  onRestore?: (id: string) => void;
}
