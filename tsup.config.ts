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
  // The phone field's own stylesheet stays an import, so the app's bundler
  // loads it from react-phone-number-input.
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-phone-number-input/style.css'],
});
