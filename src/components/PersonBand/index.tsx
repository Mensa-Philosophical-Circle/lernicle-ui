import type { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/avatar';
import { getInitials } from '../../format/getInitials';

/** Give this to links and buttons in the band's `children`. */
export const bandActionClass =
  'inline-flex min-h-[46px] items-center gap-[7px] rounded-[14px] bg-card px-4 font-semibold text-accent-foreground no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/** The band at the top of a person's profile: photo, name, one line, actions. */
export function PersonBand({
  name,
  summary,
  photoUrl,
  children,
}: {
  name: string;
  summary: string;
  photoUrl?: string | null;
  children?: ReactNode;
}) {
  return (
    <section className="flex flex-wrap items-center gap-x-[18px] gap-y-3.5 rounded-3xl bg-accent p-[clamp(16px,2.5vw,22px)]">
      <Avatar className="h-[72px] w-[72px] flex-none rounded-[22px]">
        <AvatarImage
          alt={name}
          className="object-cover"
          src={photoUrl || undefined}
        />
        <AvatarFallback className="rounded-[22px] bg-primary font-brief-display text-2xl font-bold text-primary-foreground">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-[1_1_200px]">
        <h2 className="m-0 break-words font-brief-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em]">
          {name}
        </h2>
        <p className="m-0 mt-1 text-accent-foreground">{summary}</p>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </section>
  );
}

/** A round photo, or the person's initials. */
export function PersonAvatar({
  name,
  photoUrl,
  quiet,
}: {
  name: string;
  photoUrl?: string | null;
  /** For people who are not active, such as the deleted. */
  quiet?: boolean;
}) {
  if (photoUrl) {
    return (
      <img
        alt=""
        className="h-11 w-11 flex-none rounded-full object-cover"
        src={photoUrl}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid h-11 w-11 flex-none place-items-center rounded-full font-semibold ${quiet ? 'bg-muted text-muted-foreground' : 'bg-secondary text-secondary-foreground'}`}
    >
      {getInitials(name)}
    </span>
  );
}
