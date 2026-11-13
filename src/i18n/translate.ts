import type { UICatalogue } from './en';
import { interpolate, type TextParams } from './interpolate';

export type UITranslate = (key: string, params?: TextParams) => string | undefined;

/**
 * The app's override first, then the language's catalogue, then English,
 * then the key itself so a missing string shows rather than vanishing.
 */
export function translateUI(
  key: string,
  params: TextParams | undefined,
  catalogue: UICatalogue,
  fallback: UICatalogue,
  override?: UITranslate,
): string {
  const own = override?.(key, params);

  if (own !== undefined) return own;

  const template =
    (catalogue as Record<string, string | undefined>)[key] ??
    (fallback as Record<string, string | undefined>)[key] ??
    key;

  return interpolate(template, params);
}
