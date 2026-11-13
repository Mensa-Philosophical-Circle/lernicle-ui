import { defineConfig } from 'tsup';

// One entry per area, so an app only loads what it uses. Add entries here
// and in package.json "exports" together as each area moves in.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    fields: 'src/fields.ts',
    phone: 'src/phone.ts',
    dialogs: 'src/dialogs.ts',
    charts: 'src/charts.ts',
    lists: 'src/lists.ts',
    format: 'src/format.ts',
    primitives: 'src/primitives.ts',
  },
  format: ['esm'],
  // Types come from tsc (npm run build), which is far faster than tsup's
  // per-entry declaration build.
  dts: false,
  clean: true,
  treeshake: true,
  // Bundled, not imported at runtime: Node refuses a JSON import without an
  // import attribute, and the apps' tests load this package in Node.
  noExternal: ['i18n-iso-countries/langs/en.json'],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
