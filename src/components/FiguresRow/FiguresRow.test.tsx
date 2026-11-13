import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FiguresRow } from './';

describe('FiguresRow', () => {
  it('draws a sub line as a pill when it has a tone', () => {
    render(
      <FiguresRow
        figures={[
          {
            label: 'Revenue',
            lines: ['GHS 10'],
            sub: 'Up 5%',
            subTone: 'good',
          },
        ]}
        label="Figures"
      />,
    );

    expect(screen.getByText('Up 5%').className).toContain('rounded-full');
  });

  it('keeps a plain sub line quiet without one', () => {
    render(
      <FiguresRow
        figures={[{ label: 'Revenue', lines: ['GHS 10'], sub: 'Note' }]}
        label="Figures"
      />,
    );

    expect(screen.getByText('Note').className).not.toContain('rounded-full');
  });

  it('stacks on a phone when asked', () => {
    render(
      <FiguresRow
        stackOnPhone
        figures={[{ label: 'Revenue', lines: ['GHS 10'] }]}
        label="Figures"
      />,
    );

    expect(screen.getByRole('region', { name: 'Figures' }).className).toContain(
      'grid-cols-1',
    );
  });

  it('draws report-sized numbers and colours a bad figure', () => {
    render(
      <FiguresRow
        large
        figures={[
          { label: 'Attendance', lines: ['82%'], tone: 'bad' },
          { label: 'Late', lines: ['3'] },
        ]}
        label="Figures"
        midColumns={4}
      />,
    );

    expect(screen.getByText('82%').className).toContain('text-destructive');
    expect(screen.getByText('82%').className).toContain('text-[34px]');
    expect(screen.getByText('3').className).not.toContain('text-destructive');
    expect(screen.getByRole('region', { name: 'Figures' }).className).toContain(
      '--figures-mid',
    );
  });

  it('keeps today’s size when not asked for more', () => {
    render(<FiguresRow figures={[{ label: 'A', lines: ['1'] }]} label="F" />);

    expect(screen.getByText('1').className).not.toContain('text-[34px]');
  });
});
