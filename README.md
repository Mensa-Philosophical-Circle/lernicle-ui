# Lernicle UI

The shared React components used by the Lernicle apps (owner dashboard, staff
portal, pupil portal, super-dashboard): fields, date pickers, pop-ups, list
pieces, page states and charts.

Theme colours stay in `@lernicle/branding`. This package only uses the theme's
token names (`bg-primary`, `text-muted-foreground`, ...), so it follows each
school's theme in every app.

Nothing is released yet. The components move here from the owner app's
`src/components/shared` once the section branches built on them have merged.
Until then this holds the provider, the package's own wording and the checks.

## Installing it

Apps install it by git tag, like branding, so Docker builds need no token:

```json
"@lernicle/ui": "github:Mensa-Philosophical-Circle/lernicle-ui#v0.1.0"
```

npm builds it on install through `prepare`.

React 18 and 19 both work. CI tests every change against each.

### Tailwind

The package ships class names, not CSS. Each app's own Tailwind has to scan it.

Tailwind 3 (owner, staff), `tailwind.config.js`:

```js
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@lernicle/ui/dist/**/*.js'],
```

Tailwind 4 (pupils, super-dashboard), in the CSS file that imports Tailwind.
v4 skips `node_modules` unless told:

```css
@source "../node_modules/@lernicle/ui/dist";
```

Because v3 and v4 both generate these classes, the package only writes classes
that mean the same in each. `npm run check:classes` fails the build on any
other. See `scripts/classRules.mjs` for the list and the reason for each.

## Using it

Mount the provider once, near the app's root:

```tsx
import { LernicleUIProvider } from '@lernicle/ui';

<LernicleUIProvider
  language={language}          // 'en' | 'fr' | 'es' | 'de' | 'ar' | 'tr'
  dir={dir}
  locale={formatLocale}        // for Intl, such as 'en-NG'
  timeZone={school.timeZone}
  currency={school.currency}
  formatters={useFormatters()} // optional: the app's own, so numbers match
  Link={RouterLink}            // ({ href, className, children }) => element
  notify={(text, tone) => toast(text, tone)}
  translate={t}                // optional: reword any ui.* string
>
```

The package never imports app code, a router or an API client. Everything it
needs comes through the provider. Without a provider it renders in English
with the browser's formats, so a missing provider never breaks a screen.

## Wording

The package has its own wording in all six languages, in `src/i18n`. Every
key starts with `ui.`. A test fails if a language is missing a key, has an
extra one, or changes a `{{placeholder}}`. Text a screen passes in (titles,
bodies, labels) is translated by the app.

## Working on it

```sh
npm install
npm test
npm run typecheck
npm run build && npm run check:classes
npx vite            # then open /preview/ (?lang=ar, ?dark=1)
```

To try a change inside an app before releasing, run `npm install ../lernicle-ui`
in the app, and do not commit it. Add this to the app's Vite config so the
linked copy does not bring a second React:

```ts
resolve: { dedupe: ['react', 'react-dom'] }
```

## Releasing

Bump the version in `package.json` and merge to `production`. Once CI passes,
it tags that version (`v0.1.0`, ...) by itself. Then bump the tag in each app.

While the version is `0.x`, removing or renaming a prop is a minor bump
(`0.2.0`) and the PR says what changed. Additions are patch bumps.

Extend a piece by adding a prop and a test. Never copy one into an app.
