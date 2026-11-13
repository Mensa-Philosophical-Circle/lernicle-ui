import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExportButton } from './';

describe('ExportButton', () => {
  it('says Preparing until the file is ready', async () => {
    let finish = () => {};
    const onExport = () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      });

    render(<ExportButton onExport={onExport} />);
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    expect(screen.getByRole('button', { name: 'Preparing…' })).toBeDisabled();
    await act(async () => finish());
    expect(screen.getByRole('button', { name: 'Export' })).toBeEnabled();
  });
});
