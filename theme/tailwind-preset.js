// Tailwind 3 preset for apps whose CSS reads `hsl(var(--primary))` (owner,
// staff). Add it to `presets` in tailwind.config.js. Anything the app's own
// config sets wins, so an app keeps its hand-set tokens.
//
// Three tokens not every theme has are derived from ones every theme has:
// scrim, warning-soft and warning-on-soft. The app's own variable is used
// when it defines one.

const hsl = (name) => `hsl(var(--${name}))`;

// Lernicle type in every app. Arabic falls through to IBM Plex Sans Arabic.
// Load them with `@lernicle/ui/fonts.css`.
const FONTS = {
  body: ['"Instrument Sans"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
  display: ['"Bricolage Grotesque"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
};
const pair = (name) => ({ DEFAULT: hsl(name), foreground: hsl(`${name}-foreground`) });

export default {
  theme: {
    extend: {
      colors: {
        background: hsl('background'),
        foreground: hsl('foreground'),
        border: hsl('border'),
        input: hsl('input'),
        ring: hsl('ring'),
        card: pair('card'),
        popover: pair('popover'),
        primary: pair('primary'),
        secondary: pair('secondary'),
        muted: pair('muted'),
        accent: pair('accent'),
        destructive: pair('destructive'),
        success: pair('success'),
        info: pair('info'),
        warning: {
          ...pair('warning'),
          soft: 'color-mix(in oklab, hsl(var(--warning)) 14%, hsl(var(--background)))',
          'on-soft': 'color-mix(in oklab, hsl(var(--warning)) 75%, hsl(var(--foreground)))',
        },
        // Near-black in both modes; an app with its own --scrim uses that.
        // Read through --ui-scrim so Tailwind 3 can still add opacity (bg-scrim/45).
        scrim: 'hsl(var(--ui-scrim))',
      },
      fontFamily: {
        sans: FONTS.body,
        display: FONTS.display,
        'brief-body': FONTS.body,
        'brief-display': FONTS.display,
      },
    },
  },
  plugins: [
    {
      // Colours the package reads at runtime (charts), in one format.
      handler: ({ addBase }) =>
        addBase({
          ':root, .dark': {
            '--ui-scrim': 'var(--scrim, 240 10% 8%)',
            '--ui-chart-1': hsl('chart-1'),
            '--ui-chart-2': hsl('chart-2'),
            '--ui-chart-3': hsl('chart-3'),
            '--ui-chart-4': hsl('chart-4'),
            '--ui-chart-5': hsl('chart-5'),
            '--ui-chart-line': hsl('foreground'),
          },
        }),
    },
  ],
};
