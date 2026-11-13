// The apps' tests load this package in Node, without a bundler. Every entry
// must load there: no CSS imports, no JSON imports without an attribute.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { describe, expect, it } from 'vitest';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
const entries = Object.entries(pkg.exports as Record<string, string | { import: string }>)
  .filter(([, target]) => typeof target === 'object')
  .map(([name, target]) => [name, (target as { import: string }).import] as const);

describe('built entries', () => {
  it.each(entries)('%s has no CSS or bare JSON imports', (_name, file) => {
    const source = readFileSync(resolve(__dirname, '..', file), 'utf8');

    expect(source).not.toMatch(/import\s+['"][^'"]+\.css['"]/);
    expect(source).not.toMatch(/from\s+['"][^'"]+\.json['"]/);
  });

  it.each(entries)('%s loads in Node', async (_name, file) => {
    await expect(import(pathToFileURL(resolve(__dirname, '..', file)).href)).resolves.toBeTruthy();
  });
});
