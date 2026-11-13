import type { ReactNode } from 'react';

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { LernicleUIProvider } from '../provider/LernicleUIProvider';
import { useExportAction } from './useExportAction';

const notify = vi.fn();
const wrapper = ({ children }: { children: ReactNode }) => (
  <LernicleUIProvider notify={notify}>{children}</LernicleUIProvider>
);

describe('useExportAction', () => {
  it('is preparing until the file is ready', async () => {
    let finish = () => {};
    const exportFile = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    const { result } = renderHook(() => useExportAction(exportFile));

    act(() => {
      void result.current.run();
    });
    expect(result.current.isPreparing).toBe(true);

    await act(async () => finish());
    expect(result.current.isPreparing).toBe(false);
  });

  it('does not start a second export while one is running', () => {
    const exportFile = vi.fn(() => new Promise<void>(() => {}));
    const { result } = renderHook(() => useExportAction(exportFile));

    act(() => {
      void result.current.run();
      void result.current.run();
    });

    expect(exportFile).toHaveBeenCalledOnce();
  });

  it('says when the export failed', async () => {
    const { result } = renderHook(
      () => useExportAction(() => Promise.reject(new Error('no'))),
      { wrapper },
    );

    await act(() => result.current.run());

    expect(notify).toHaveBeenCalledWith({
      title: "We couldn't prepare your file.",
      description: 'Nothing has changed. Please try again in a moment.',
      tone: 'error',
    });
    expect(result.current.isPreparing).toBe(false);
  });
});
