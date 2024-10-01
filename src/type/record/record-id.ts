export type RecordId = `${string}${number}`;

export const RecordIdDelimiter = '@';

export const isRecordId = (value: unknown): value is RecordId => typeof value === 'string' && /^[A-Z]+\d+$/.test(value);

export const isRecordIdReference = (value: unknown): boolean =>
    typeof value === 'string' && value.startsWith(RecordIdDelimiter) && value.endsWith(RecordIdDelimiter) && isRecordId(value.slice(1, -1));
