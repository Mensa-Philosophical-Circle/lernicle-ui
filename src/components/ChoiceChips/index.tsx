import { X } from '@phosphor-icons/react';

import { useUIText } from '../../provider/LernicleUIProvider';

/** What a many-choice field holds, each with its own remove button. */
export function ChoiceChips({
  chips,
  onRemove,
}: {
  chips: { value: string; label: string }[];
  onRemove: (value: string) => void;
}) {
  const { t } = useUIText();

  if (chips.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip.value}
          className="inline-flex max-w-full items-center gap-0.5 rounded-full bg-secondary ps-3 text-sm font-semibold leading-5 text-secondary-foreground"
        >
          <span className="truncate">{chip.label}</span>
          <button
            aria-label={t('ui.chips.remove', { name: chip.label })}
            className="grid size-11 flex-none place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="button"
            onClick={() => onRemove(chip.value)}
          >
            <X aria-hidden size={14} weight="bold" />
          </button>
        </span>
      ))}
    </div>
  );
}
