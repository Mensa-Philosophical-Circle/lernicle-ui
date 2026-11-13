import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { LernicleUIProvider, useUI, type UILinkProps } from './LernicleUIProvider';

function Probe() {
  const { language, dir, formatters, Link, notify, text } = useUI();

  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="dir">{dir}</span>
      <span data-testid="money">{formatters.money(1500)}</span>
      <span data-testid="text">{text('ui.missing')}</span>
      <Link href="/bank">Connect</Link>
      <button type="button" onClick={() => notify('Saved', 'success')}>
        Notify
      </button>
    </div>
  );
}

afterEach(cleanup);

describe('LernicleUIProvider', () => {
  it('works with no provider: English, left to right, a plain link', () => {
    render(<Probe />);

    expect(screen.getByTestId('language').textContent).toBe('en');
    expect(screen.getByTestId('dir').textContent).toBe('ltr');
    expect(screen.getByTestId('text').textContent).toBe('ui.missing');
    expect(screen.getByRole('link', { name: 'Connect' }).getAttribute('href')).toBe('/bank');
    screen.getByRole('button', { name: 'Notify' }).click();
  });

  it('takes the language from a regional code, and Arabic reads right to left', () => {
    render(
      <LernicleUIProvider language="ar-EG">
        <Probe />
      </LernicleUIProvider>,
    );

    expect(screen.getByTestId('language').textContent).toBe('ar');
    expect(screen.getByTestId('dir').textContent).toBe('rtl');
  });

  it('falls back to English for a language it does not have', () => {
    render(
      <LernicleUIProvider language="sw">
        <Probe />
      </LernicleUIProvider>,
    );

    expect(screen.getByTestId('language').textContent).toBe('en');
  });

  it('formats money with the school currency', () => {
    render(
      <LernicleUIProvider locale="en-NG" currency="NGN">
        <Probe />
      </LernicleUIProvider>,
    );

    expect(screen.getByTestId('money').textContent).toMatch(/1,500/);
    expect(screen.getByTestId('money').textContent).toMatch(/₦|NGN/);
  });

  it("uses the app's link, toast and wording", () => {
    const notify = vi.fn();
    const AppLink = ({ href, children }: UILinkProps) => (
      <a href={`/app${href}`}>{children}</a>
    );

    render(
      <LernicleUIProvider
        Link={AppLink}
        notify={notify}
        translate={(key) => (key === 'ui.missing' ? 'Reworded' : undefined)}
      >
        <Probe />
      </LernicleUIProvider>,
    );

    expect(screen.getByRole('link', { name: 'Connect' }).getAttribute('href')).toBe('/app/bank');
    expect(screen.getByTestId('text').textContent).toBe('Reworded');
    screen.getByRole('button', { name: 'Notify' }).click();
    expect(notify).toHaveBeenCalledWith('Saved', 'success');
  });
});
