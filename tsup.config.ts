import { defineConfig } from 'tsup';

// One entry per area, so an app only loads what it uses. Add entries here
// and in package.json "exports" together as each area moves in.
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
