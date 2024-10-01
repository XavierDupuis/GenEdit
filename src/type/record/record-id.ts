import { UppercaseLetter } from '@type/uppercase-letter';

export type RecordId = `${UppercaseLetter}${number}`;

export const isRecordId = (value: unknown): value is RecordId => typeof value === 'string' && /^[A-Z]+\d+$/.test(value);
