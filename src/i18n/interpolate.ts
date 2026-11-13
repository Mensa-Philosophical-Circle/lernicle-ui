export type TextParams = Record<string, string | number | null | undefined>;

const PLACEHOLDER = /\{\{([a-zA-Z0-9_]+)\}\}/g;

/**
 * Replaces `{{name}}` placeholders, the same syntax as the apps' catalogues.
 * Values go in as plain text. An unknown placeholder is left as written so
 * the gap is visible.
 */
export function interpolate(template: string, params?: TextParams): string {
  if (!params) return template;

  return template.replace(PLACEHOLDER, (whole, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name] ?? '')
      : whole,
  );
}

/** The placeholder names a string uses, for the catalogue test. */
export function placeholdersOf(template: string): string[] {
  const names = new Set<string>();

  for (const match of template.matchAll(PLACEHOLDER)) names.add(match[1]);

  return [...names].sort();
}
