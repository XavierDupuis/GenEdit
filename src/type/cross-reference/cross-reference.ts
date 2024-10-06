const PointerDelimiter = '@';

type CrossReference = `${string}${number}`;

const isCrossReference = (value: unknown): value is CrossReference => typeof value === 'string' && (value === VOID || /^[A-Z]+\d+$/.test(value));

const VOID = 'VOID' as const;

type Pointer<T extends string> = `${typeof PointerDelimiter}${T | typeof VOID}${typeof PointerDelimiter}`;

export type CrossReferencePointer = Pointer<CrossReference>;

export const isCrossReferencePointer = (value: unknown): value is CrossReferencePointer =>
    typeof value === 'string' && value.startsWith(PointerDelimiter) && value.endsWith(PointerDelimiter) && isCrossReference(value.slice(1, -1));
