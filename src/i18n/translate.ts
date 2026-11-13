import type { UICatalogue } from './en';
import { interpolate, pluralCategory, type TextParams } from './interpolate';

export type UITranslate = (key: string, params?: TextParams) => string | undefined;

/**
 * The app's override first, then the language's catalogue, then English,
 * then the key itself so a missing string shows rather than vanishing.
 * With a numeric `count`, the language's plural form is used (`key_one`,
 * `key_other`, ...), as in the apps' own `translate`.
 */
export function translateUI(
  language: string,
  key: string,
  params: TextParams | undefined,
  catalogue: UICatalogue,
  fallback: UICatalogue,
  override?: UITranslate,
): string {
  const own = override?.(key, params);

  if (own !== undefined) return own;

  const candidates =
    params && typeof params.count === 'number'
      ? [`${key}_${pluralCategory(language, params.count)}`, `${key}_other`, key]
      : [key];

  for (const source of [catalogue, fallback]) {
    for (const candidate of candidates) {
      if (Object.prototype.hasOwnProperty.call(source, candidate)) {
        return interpolate(source[candidate], params);
      }
    }
  }

  return key;
}
