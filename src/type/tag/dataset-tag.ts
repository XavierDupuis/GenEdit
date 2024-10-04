export const DatasetTags = {
    HEAD: 'HEAD',
    TRLR: 'TRLR',
} as const;

export type DatasetTag = (typeof DatasetTags)[keyof typeof DatasetTags];

const DatasetTagValues: string[] = Object.values(DatasetTags);

export const isDatasetTag = (value: string): value is DatasetTag => DatasetTagValues.includes(value);
