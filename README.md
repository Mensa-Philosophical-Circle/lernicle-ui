# Lernicle UI

The shared React components used by the Lernicle apps (owner dashboard, staff
portal, pupil portal, super-dashboard): fields, date pickers, pop-ups, list
pieces, page states and charts.

Theme colours stay in `@lernicle/branding`. This package only uses the theme's
token names (`bg-primary`, `text-muted-foreground`, ...), so it follows each
school's theme in every app.

Apps will install it by git tag, like branding:

```json
"@lernicle/ui": "github:Mensa-Philosophical-Circle/lernicle-ui#v0.1.0"
```

Nothing is released yet. The components move here from the owner app's
`src/components/shared` once the section branches built on them have merged.
