import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RowMenu } from './';
import { LernicleUIProvider } from '../../provider/LernicleUIProvider';

describe('RowMenu', () => {
  it('names the button and runs the picked item', async () => {
    const onSelect = vi.fn();

    render(
      <RowMenu items={[{ label: 'Delete', onSelect }]} label="More for Ada" />,
    );
    fireEvent.keyDown(screen.getByRole('button', { name: 'More for Ada' }), {
      key: 'Enter',
    });
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('goes to an item’s page through the app', async () => {
    const navigate = vi.fn();

    render(
      <LernicleUIProvider navigate={navigate}>
        <RowMenu items={[{ label: 'Open', to: '/pupils/7' }]} label="More for Ada" />
      </LernicleUIProvider>,
    );
    fireEvent.keyDown(screen.getByRole('button', { name: 'More for Ada' }), {
      key: 'Enter',
    });
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Open' }));
    expect(navigate).toHaveBeenCalledWith('/pupils/7');
  });

  it('draws nothing when there is nothing to pick', () => {
    const { container } = render(
      <RowMenu items={[]} label="More for Ada" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
