export const RecordIdReferenceDelimiter = '@';

export type RecordId = `${string}${number}`;
export type RecordIdReference = `${typeof RecordIdReferenceDelimiter}${RecordId}${typeof RecordIdReferenceDelimiter}`;

export const isRecordId = (value: unknown): value is RecordId => typeof value === 'string' && /^[A-Z]+\d+$/.test(value);

export const isRecordIdReference = (value: unknown): value is RecordIdReference =>
    typeof value === 'string' &&
    value.startsWith(RecordIdReferenceDelimiter) &&
    value.endsWith(RecordIdReferenceDelimiter) &&
    isRecordId(value.slice(1, -1));

export const recordIdToReference = (recordId: RecordId): RecordIdReference => `${RecordIdReferenceDelimiter}${recordId}${RecordIdReferenceDelimiter}`;
export const recordIdFromReference = (recordIdReference: RecordIdReference): RecordId => recordIdReference.slice(1, -1) as RecordId;
