import { useState } from 'react';

import { Button } from '../../src/primitives/button';
import { PREVIEW_OPTIONS } from '../previewData';
import { ConfirmDialog, ModalShell } from '../../src/dialogs';
import { FormField, SearchableSelect } from '../../src/fields';
import { dialogPrimaryButtonClass, secondaryButtonClass } from '../../src';

export function KitOverlays() {
  const [modal, setModal] = useState<'' | 'form' | 'confirm'>('');
  const [value, setValue] = useState('');
  const close = () => setModal('');

  return (
    <div className="flex flex-wrap gap-2">
      <Button className={secondaryButtonClass} type="button" variant="ghost" onClick={() => setModal('form')}>
        Modal with dropdown
      </Button>
      <Button className={secondaryButtonClass} type="button" variant="ghost" onClick={() => setModal('confirm')}>
        Confirm
      </Button>
      <ModalShell
        actions={
          <Button className={dialogPrimaryButtonClass} type="button" onClick={close}>
            Save
          </Button>
        }
        open={modal === 'form'}
        size="lg"
        title="Add payroll"
        onOpenChange={close}
      >
        <FormField label="Staff member">
          <SearchableSelect options={PREVIEW_OPTIONS} value={value} onChange={setValue} />
        </FormField>
      </ModalShell>
      <ConfirmDialog
        body="This will remove the record from your books."
        confirmLabel="Delete record"
        detail="This cannot be undone."
        open={modal === 'confirm'}
        title="Delete this record?"
        onConfirm={close}
        onOpenChange={close}
      />
    </div>
  );
}
