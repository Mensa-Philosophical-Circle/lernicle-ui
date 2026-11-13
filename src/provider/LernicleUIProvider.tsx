import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from 'react';

import { CATALOGUES, UI_LANGUAGES, type UILanguage } from '../i18n/catalogues';
import type { UITextKey } from '../i18n/en';
import type { TextParams } from '../i18n/interpolate';
import { translateUI, type UITranslate } from '../i18n/translate';
import { createDefaultFormatters, type UIFormatters } from './defaultFormatters';

export interface UILinkProps {
  href: string;
  className?: string;
  children?: ReactNode;
}

export type UINotifyTone = 'success' | 'error' | 'info';

export interface UINotice {
  title: string;
  description?: string;
  tone: UINotifyTone;
}

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
  notify?: (notice: UINotice) => void;
  /** Checked first for `ui.*` keys, so an app can reword a string. */
  translate?: UITranslate;
  /**
   * Turns a validator's message into the school's language before a field
   * shows it. Messages it doesn't know come back unchanged.
   */
  formatError?: (message: string) => string;
  /** How the app moves to a route (row menus). Defaults to a full page load. */
  navigate?: (to: string) => void;
  children?: ReactNode;
}

export interface UIContextValue {
  language: UILanguage;
  dir: 'ltr' | 'rtl';
  /** Always set: the app's, else the browser's, else `en`. */
  locale: string;
  timeZone?: string;
  currency?: string;
  formatters: UIFormatters;
  Link: ComponentType<UILinkProps>;
  notify: (notice: UINotice) => void;
  formatError: (message: string) => string;
  navigate: (to: string) => void;
  text: (key: UITextKey, params?: TextParams) => string;
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

function browserLocale(): string {
  return (typeof navigator !== 'undefined' && navigator.language) || 'en';
}

function buildValue(props: LernicleUIProviderProps): Omit<UIContextValue, 'text'> {
  const language = toLanguage(props.language);
  const locale = props.locale ?? browserLocale();

  return {
    language,
    dir: props.dir ?? (language === 'ar' ? 'rtl' : 'ltr'),
    locale,
    timeZone: props.timeZone,
    currency: props.currency,
    formatters:
      props.formatters ?? createDefaultFormatters(locale, props.currency),
    Link: props.Link ?? PlainLink,
    notify: props.notify ?? (() => {}),
    formatError: props.formatError ?? ((message) => message),
    navigate: props.navigate ?? ((to) => window.location.assign(to)),
  };
}

const DEFAULT_BASE = buildValue({});
const DEFAULT_VALUE: UIContextValue = {
  ...DEFAULT_BASE,
  text: (key, params) =>
    translateUI('en', key, params, CATALOGUES.en, CATALOGUES.en),
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
    formatError,
    navigate,
    children,
  } = props;

  const base = useMemo(
    () =>
      buildValue({
        language,
        dir,
        locale,
        timeZone,
        currency,
        formatters,
        Link,
        notify,
        formatError,
        navigate,
      }),
    [language, dir, locale, timeZone, currency, formatters, Link, notify, formatError, navigate],
  );

  const text = useCallback(
    (key: UITextKey, params?: TextParams) =>
      translateUI(base.language, key, params, CATALOGUES[base.language], CATALOGUES.en, translate),
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

/**
 * The school's locale, time zone and currency with the formatters, in the
 * shape of the apps' `useFormatters()`.
 */
export function useUIFormat() {
  const { locale, timeZone, currency, formatters } = useContext(UIContext);

  return { locale, timeZone, currency, ...formatters };
}
