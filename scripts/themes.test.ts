// Compiles the package's theme files with real Tailwind 3 and 4, as the apps
// will, and checks the kit's colour names come out.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { compile } from '@tailwindcss/node';
import postcss from 'postcss';
// @ts-expect-error the v3 package, installed under another name, has no types here
import tailwind3 from 'tailwindcss3';
import { describe, expect, it } from 'vitest';

// @ts-expect-error plain JS preset without types
import preset from '../theme/tailwind-preset.js';

const CLASSES = [
  'bg-scrim/45',
  'bg-warning-soft',
  'text-warning-on-soft',
  'bg-primary',
  'text-primary-foreground',
  'text-muted-foreground',
  'border-border',
  'bg-success',
  'font-brief-display',
  'font-brief-body',
  'font-sans',
  'font-display',
];

const selector = (name: string) => `.${name.replace(/\//g, '\\/')}`;

describe('Tailwind 3 preset (owner, staff)', () => {
  it('generates every colour name the kit uses, and the chart variables', async () => {
    const result = await postcss([
      tailwind3({
        presets: [preset],
        content: [{ raw: `<div class="${CLASSES.join(' ')}"></div>` }],
        corePlugins: { preflight: false },
      }),
    ]).process('@tailwind base; @tailwind utilities;', { from: undefined });

    for (const name of CLASSES) expect(result.css, name).toContain(selector(name));
    expect(result.css).toContain('--ui-chart-1: hsl(var(--chart-1))');
    expect(result.css).toContain('hsl(var(--ui-scrim) / 0.45)');
    expect(result.css).toContain('--ui-scrim: var(--scrim, 240 10% 8%)');
    expect(result.css).toMatch(/font-brief-display\s*\{\s*font-family: "Bricolage Grotesque"/);
  });

  it('lets the app keep its own token', async () => {
    const result = await postcss([
      tailwind3({
        presets: [preset],
        theme: { extend: { colors: { scrim: 'hsl(var(--scrim))' } } },
        content: [{ raw: '<div class="bg-scrim/45"></div>' }],
        corePlugins: { preflight: false },
      }),
    ]).process('@tailwind utilities;', { from: undefined });

    expect(result.css).toContain('hsl(var(--scrim) / 0.45)');
  });
});

describe.each([
  ['theme-var.css', 'var(--chart-1)'],
  ['theme-hsl.css', 'hsl(var(--chart-1))'],
])('Tailwind 4 %s (pupils, super-dashboard)', (file, chart) => {
  it('generates every colour name the kit uses, and the chart variables', async () => {
    const theme = readFileSync(resolve(__dirname, '../theme', file), 'utf8');
    const compiler = await compile(`@import 'tailwindcss/theme.css';\n@import 'tailwindcss/utilities.css';\n${theme}`, {
      base: resolve(__dirname, '..'),
      onDependency: () => {},
    });
    const css = compiler.build(CLASSES);

    for (const name of CLASSES) expect(css, name).toContain(selector(name));
    expect(css).toContain(`--ui-chart-1: ${chart}`);
    expect(css).toContain("'Bricolage Grotesque'");
  });
});
