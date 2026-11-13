import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { LernicleUIProvider, UI_LANGUAGES, useUI } from '../src';
import './preview.css';

// Every piece at once, with no sign-in. Add ?lang=ar and ?dark=1 to check
// Arabic and dark mode. Each area adds its section here as it moves in.
const params = new URLSearchParams(window.location.search);
const language = params.get('lang') ?? 'en';

if (params.get('dark') === '1') document.documentElement.classList.add('dark');

function Settings() {
  const { language: active, dir, formatters } = useUI();

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Provider</h2>
      <p className="text-sm text-muted-foreground">
        {active} · {dir} · {formatters.money(1234.5)} · {formatters.percent(0.42)}
      </p>
      <p className="mt-4 flex flex-wrap gap-2 text-sm">
        {UI_LANGUAGES.map((code) => (
          <a key={code} className="text-primary underline" href={`?lang=${code}`}>
            {code}
          </a>
        ))}
      </p>
    </section>
  );
}

function Preview() {
  return (
    <LernicleUIProvider language={language} locale="en-NG" currency="NGN">
      <main
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="mx-auto flex max-w-3xl flex-col gap-6 p-6"
      >
        <h1 className="text-2xl font-bold">Lernicle UI</h1>
        <Settings />
      </main>
    </LernicleUIProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
