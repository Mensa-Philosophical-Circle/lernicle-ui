import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { briefTextClass, LernicleUIProvider } from '../src';
import { KitCharts } from './sections/KitCharts';
import { KitFields } from './sections/KitFields';
import { KitOverlays } from './sections/KitOverlays';
import { KitPagePieces } from './sections/KitPagePieces';
import { KitTable } from './sections/KitTable';
import { KitType } from './sections/KitType';
import 'react-phone-number-input/style.css';
import './preview.css';

// Every piece at once, with no sign-in. Add ?lang=ar and ?dark=1 to check
// Arabic and dark mode.
const params = new URLSearchParams(window.location.search);
const language = params.get('lang') ?? 'en';
const dir = language === 'ar' ? 'rtl' : 'ltr';

document.documentElement.lang = language;
document.documentElement.dir = dir;
if (params.get('dark') === '1') document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LernicleUIProvider
      currency="NGN"
      dir={dir}
      language={language}
      locale={language === 'ar' ? 'ar-EG' : 'en-NG'}
      notify={(notice) => window.alert(notice.title)}
      timeZone="Africa/Lagos"
    >
      <main
        className={`flex w-full min-w-0 flex-col gap-8 bg-background px-3.5 pb-16 pt-4 md:px-6 ${briefTextClass}`}
      >
        <h1 className="m-0 font-brief-display text-[26px] font-bold">Lernicle UI</h1>
        <KitType />
        <KitFields />
        <KitPagePieces />
        <KitTable />
        <KitOverlays />
        <KitCharts />
      </main>
    </LernicleUIProvider>
  </StrictMode>,
);
