# Lernicle UI

The shared React components used by the Lernicle apps (owner dashboard, staff
portal, pupil portal, super-dashboard): fields, date pickers, pop-ups, list
pieces, page states and charts.

Theme colours stay in `@lernicle/branding`. This package only uses the theme's
token names (`bg-primary`, `text-muted-foreground`, ...), so it follows each
school's theme in every app.

The pieces came from the owner app's shared kit (`src/components/shared`).
Bulk import and the print and export pages follow in their own releases.

| Import from | What |
|---|---|
| `@lernicle/ui` | Provider, `Button`, `Heading`, type and field classes, page states, `Pager`, `ListToolbar`, `FiguresRow`, `StatusPill`, `UnderlineTabs`, `RowMenu`, `SaveBar`, `PersonBand`, `DeletedPeopleList`, ... |
| `@lernicle/ui/fields` | `FormField`, `SearchableSelect`, currency, country, time zone and language pickers, date, month and time fields, choices, amounts |
| `@lernicle/ui/phone` | `PhoneField` |
| `@lernicle/ui/dialogs` | `ModalShell`, `ConfirmDialog` |
| `@lernicle/ui/charts` | `BarsChart`, `LineChart`, `DonutChart` and their pieces |
| `@lernicle/ui/lists` | `usePagedState`, `usePagedResult`, `readPagedEnvelope`, `useLocalList`, `useRowSelection`, `useExportAction` |
| `@lernicle/ui/format` | School days, month grids, times, currencies, regions. Plain functions |
| `@lernicle/ui/primitives` | The building blocks: dropdown menu, popover, dialog, alert dialog, sheet, select, tabs, tooltip, table, card, badge, avatar, checkbox, radio, switch, input, textarea, label, ... |

Prefer the kit piece where there is one: `SearchableSelect` over `Select`,
`ModalShell` over `Dialog`, `ConfirmDialog` over `AlertDialog`, `Button` over
`BaseButton`.

## Buttons and type

Buttons and type come from here, so every app looks the same.

```tsx
import { Button, Heading, mutedTextClass } from '@lernicle/ui';

<Heading level={1}>Payroll</Heading>
<p className={mutedTextClass}>Paid on the 25th.</p>
<Button tone="primary" onClick={save}>Save</Button>
<Button asChild tone="secondary"><Link to="/payroll/history">History</Link></Button>
```

`Button` tones: `primary`, `dialogPrimary`, `secondary`, `quiet`, `danger`,
`link`, `dangerLink`. A button is `type="button"` unless told otherwise.

Type: `pageTitleClass`, `sectionTitleClass`, `cardTitleClass`,
`eyebrowClass`, `bodyTextClass`, `mutedTextClass`, `fieldLabelClass`. The
fonts are Instrument Sans for text, Bricolage Grotesque for titles and IBM
Plex Sans Arabic for Arabic. The Tailwind preset and theme files set them as
`font-sans`, `font-display`, `font-brief-body` and `font-brief-display`.
`@lernicle/ui/fonts.css` loads them; import it before Tailwind.

## Installing it

Apps install it by git tag, like branding, so Docker builds need no token:

```json
"@lernicle/ui": "github:Mensa-Philosophical-Circle/lernicle-ui#v0.1.0"
```

npm builds it on install through `prepare`.

React 18 and 19 both work. CI tests every change against each.

The Radix pieces that open layers (dialog, alert dialog, popover, dropdown
menu, select, tooltip) and cmdk are peer dependencies, so the app and the
package share one copy. Two copies would close a kit modal when an app
popover inside it is clicked. Most apps already have them; `npm install`
says which are missing.

### Tailwind

The package ships class names, not CSS. Each app's own Tailwind has to scan it.

Tailwind 3 (owner, staff), `tailwind.config.js`:

```js
import uiPreset from '@lernicle/ui/tailwind-preset';

export default {
  presets: [uiPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@lernicle/ui/dist/**/*.js'],
  // ...the app's own theme; anything set here wins over the preset
};
```

Tailwind 4, in the CSS file that imports Tailwind. v4 skips `node_modules`
unless told. Pick the colour file that matches how the app's CSS variables
are written:

```css
@import '@lernicle/ui/fonts.css';
@import 'tailwindcss';
@import '@lernicle/ui/theme-var.css'; /* var(--primary), such as hex: pupils */
/* or '@lernicle/ui/theme-hsl.css'      hsl(var(--primary)): super-dashboard */
@source '../node_modules/@lernicle/ui/dist';
```

The preset and the colour files map the colour names the kit uses
(`primary`, `muted-foreground`, `success`, `chart-1`...) to the app's
variables. Three names not every theme has are worked out from ones every
theme has, unless the app defines its own: `scrim`, `warning-soft` and
`warning-on-soft`. They also set `--ui-chart-1`...`5`, which the charts read.
`scripts/themes.test.ts` compiles all of this with real Tailwind 3 and 4.

An app that uses `@lernicle/ui/phone` loads the phone library's stylesheet
once, in its entry file: `import 'react-phone-number-input/style.css'`. The
package doesn't import CSS from JavaScript, so Node (the apps' tests) can load
every entry.

Because v3 and v4 both generate these classes, the package only writes classes
that mean the same in each. `npm run check:classes` fails the build on any
other. See `scripts/classRules.mjs` for the list and the reason for each.

## Using it

Mount the provider once, near the app's root. It must sit inside the router
when `Link` and `navigate` come from it:

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
  notify={({ title, description, tone }) => toast({ title, description })}
  navigate={useNavigate()}     // row menus
  formatError={(m) => localizeFormError(m, t)} // validator messages
  translate={t}                // optional: reword any ui.* string
>
```

The package never imports app code, a router or an API client. Everything it
needs comes through the provider. Without a provider it renders in English
with the browser's formats, so a missing provider never breaks a screen.

## Wording

The package has its own wording in all six languages, in `src/i18n`. Every
key starts with `ui.`. A plural string is asked for by its base key with a
numeric `count` (`t('ui.import.added', { count })`), and the language's form
is picked, as in the apps. A test fails if a language is missing a key, has a
key English lacks (other than an extra plural form), or changes a
`{{placeholder}}`. Text a screen passes in (titles,
bodies, labels) is translated by the app.

## Working on it

```sh
npm install
npm test
npm run typecheck
npm run build && npm run check:classes
npx vite            # then open /preview/ (?lang=ar, ?dark=1): every piece
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
