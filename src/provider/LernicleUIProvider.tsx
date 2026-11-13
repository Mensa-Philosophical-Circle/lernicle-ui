import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from 'react';

import { CATALOGUES, UI_LANGUAGES, type UILanguage } from '../i18n/catalogues';
import type { TextParams } from '../i18n/interpolate';
import { translateUI, type UITranslate } from '../i18n/translate';
import { createDefaultFormatters, type UIFormatters } from './defaultFormatters';

export interface UILinkProps {
  href: string;
  className?: string;
  children?: ReactNode;
}

export type UINotifyTone = 'success' | 'error' | 'info';

export interface LernicleUIProviderProps {
  /** The app's language. Unknown codes fall back to English. */
  language?: string;
  dir?: 'ltr' | 'rtl';
  /** BCP 47 locale for Intl, such as `en-NG`. Defaults to the browser's. */
  locale?: string;
  /** IANA zone of the school, for school days and month grids. */
  timeZone?: string;
  /** ISO currency used when a piece is given none. */
  currency?: string;
  /** The app's own formatters, so numbers match the rest of its screens. */
  formatters?: UIFormatters;
  /** How the app renders a link, so the package never imports a router. */
  Link?: ComponentType<UILinkProps>;
  /** How the app shows a toast. Without it, failures show inline only. */
  notify?: (text: string, tone: UINotifyTone) => void;
  /** Checked first for `ui.*` keys, so an app can reword a string. */
  translate?: UITranslate;
  children?: ReactNode;
}

export interface UIContextValue {
  language: UILanguage;
  dir: 'ltr' | 'rtl';
  locale?: string;
  timeZone?: string;
  currency?: string;
  formatters: UIFormatters;
  Link: ComponentType<UILinkProps>;
  notify: (text: string, tone: UINotifyTone) => void;
  text: (key: string, params?: TextParams) => string;
}

function PlainLink({ href, className, children }: UILinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function toLanguage(code: string | undefined): UILanguage {
  const base = code?.toLowerCase().split('-')[0];

  return (UI_LANGUAGES as readonly string[]).includes(base ?? '')
    ? (base as UILanguage)
    : 'en';
}

function buildValue(props: LernicleUIProviderProps): Omit<UIContextValue, 'text'> {
  const language = toLanguage(props.language);

  return {
    language,
    dir: props.dir ?? (language === 'ar' ? 'rtl' : 'ltr'),
    locale: props.locale,
    timeZone: props.timeZone,
    currency: props.currency,
    formatters:
      props.formatters ?? createDefaultFormatters(props.locale, props.currency),
    Link: props.Link ?? PlainLink,
    notify: props.notify ?? (() => {}),
  };
}

const DEFAULT_BASE = buildValue({});
const DEFAULT_VALUE: UIContextValue = {
  ...DEFAULT_BASE,
  text: (key, params) =>
    translateUI(key, params, CATALOGUES.en, CATALOGUES.en),
};

const UIContext = createContext<UIContextValue>(DEFAULT_VALUE);

/**
 * Gives the package its language, formats, links and toasts. Mount once near
 * the app's root. Without it, pieces render in English with browser formats.
 */
export function LernicleUIProvider(props: LernicleUIProviderProps) {
  const {
    language,
    dir,
    locale,
    timeZone,
    currency,
    formatters,
    Link,
    notify,
    translate,
    children,
  } = props;

  const base = useMemo(
    () =>
      buildValue({ language, dir, locale, timeZone, currency, formatters, Link, notify }),
    [language, dir, locale, timeZone, currency, formatters, Link, notify],
  );

  const text = useCallback(
    (key: string, params?: TextParams) =>
      translateUI(key, params, CATALOGUES[base.language], CATALOGUES.en, translate),
    [base.language, translate],
  );

  const value = useMemo(() => ({ ...base, text }), [base, text]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/** Everything the provider gives. */
export function useUI(): UIContextValue {
  return useContext(UIContext);
}

/** The package's wording and the text direction, like the apps' `useT`. */
export function useUIText() {
  const { text, dir, language } = useContext(UIContext);

  return { t: text, dir, language };
}
