/**
 * The package's own wording, in English. Every key starts with `ui.`.
 * The kit's strings move here from the owner app's `kit.ts` with the
 * components that use them.
 */
export const en = {} as const satisfies Record<`ui.${string}`, string>;

export type UITextKey = keyof typeof en;
export type UICatalogue = Partial<Record<UITextKey, string>>;
