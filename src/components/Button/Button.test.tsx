import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './';
import { Heading } from '../Heading';

describe('Button', () => {
  it('is a plain button by default, so it never submits a form', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toContain('bg-primary');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('takes a tone, and the app can add classes', () => {
    render(
      <Button className="w-full" tone="danger">
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });

    expect(button.className).toContain('bg-destructive');
    expect(button.className).toContain('w-full');
  });

  it('styles a link when asked', () => {
    render(
      <Button asChild tone="secondary">
        <a href="/pupils">All pupils</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'All pupils' });

    expect(link).toHaveAttribute('href', '/pupils');
    expect(link).not.toHaveAttribute('type');
    expect(link.className).toContain('border-border');
  });
});

describe('Button sizes, as the designs draw them', () => {
  it('is 48px with 12px corners; primary has 20px sides', () => {
    render(<Button>Save</Button>);
    const classes = screen.getByRole('button', { name: 'Save' }).className.split(' ');

    expect(classes).toEqual(expect.arrayContaining(['min-h-12', 'rounded-xl', 'px-5', 'font-bold']));
  });

  it('can be a square 44px icon button', () => {
    render(<Button aria-label="Close" iconOnly tone="quiet">×</Button>);
    const classes = screen.getByRole('button', { name: 'Close' }).className.split(' ');

    expect(classes).toEqual(expect.arrayContaining(['size-11', 'min-h-11', 'p-0']));
    expect(classes).not.toContain('min-h-12');
  });
});

describe('Heading', () => {
  it('sets the level and the look apart', () => {
    render(
      <>
        <Heading level={1}>Payroll</Heading>
        <Heading level={2} size="card">
          This month
        </Heading>
      </>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Payroll' }).className,
    ).toContain('text-[26px]');
    expect(
      screen.getByRole('heading', { level: 2, name: 'This month' }).className,
    ).toContain('text-[17px]');
  });
});
