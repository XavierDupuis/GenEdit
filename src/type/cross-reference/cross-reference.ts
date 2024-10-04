export const PointerDelimiter = '@';

export type CrossReference = `${string}${number}`;

export const VOID = 'VOID' as const;

export type Pointer<T extends string> = `${typeof PointerDelimiter}${T | typeof VOID}${typeof PointerDelimiter}`;
export type CrossReferencePointer = Pointer<CrossReference>;

export const isCrossReference = (value: unknown): value is CrossReference =>
    typeof value === 'string' && (value === VOID || /^[A-Z]+\d+$/.test(value));

export const isCrossReferencePointer = (value: unknown): value is CrossReferencePointer =>
    typeof value === 'string' && value.startsWith(PointerDelimiter) && value.endsWith(PointerDelimiter) && isCrossReference(value.slice(1, -1));

export const toCrossReferencePointer = (crossReference: CrossReference): CrossReferencePointer =>
    `${PointerDelimiter}${crossReference}${PointerDelimiter}`;

export const toCrossReference = (crossReferencePointer: CrossReferencePointer): CrossReference =>
    crossReferencePointer.slice(1, -1) as CrossReference;
