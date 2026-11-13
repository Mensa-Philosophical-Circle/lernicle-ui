// Fails the build when dist/ uses a class that means something different in
// Tailwind 3 and 4. See classRules.mjs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { findProblems } from './classRules.mjs';

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);

    return statSync(path).isDirectory() ? files(path) : path.endsWith('.js') ? [path] : [];
  });
}

let count = 0;

for (const file of files('dist')) {
  for (const { token, why } of findProblems(readFileSync(file, 'utf8'))) {
    console.error(`${file}: "${token}" — ${why}`);
    count += 1;
  }
}

if (count > 0) {
  console.error(`\n${count} class name(s) differ between Tailwind 3 and 4.`);
  process.exit(1);
}

console.log('Class names are the same in Tailwind 3 and 4.');
