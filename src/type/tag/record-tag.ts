export const RecordTags = {
    FAM: 'FAM',
    INDI: 'INDI',
    OBJE: 'OBJE',
    REPO: 'REPO',
    SNOTE: 'SNOTE',
    SOUR: 'SOUR',
    SUBM: 'SUBM',
} as const;

export type RecordTag = (typeof RecordTags)[keyof typeof RecordTags];

const RecordTagValues: string[] = Object.values(RecordTags);

export const isRecordTag = (value: string): value is RecordTag => RecordTagValues.includes(value);
