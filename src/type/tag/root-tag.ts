import { DatasetTags } from '@type/tag/dataset-tag';
import { RecordTags } from '@type/tag/record-tag';

export const RootTags = {
    ...DatasetTags,
    ...RecordTags,
} as const;

export const RootTagOrder: { [key in RootTag]: number } = {
    HEAD: 0,
    FAM: 1,
    INDI: 2,
    OBJE: 3,
    REPO: 4,
    SNOTE: 5,
    SOUR: 6,
    SUBM: 7,
    TRLR: 8,
};

export type RootTag = (typeof RootTags)[keyof typeof RootTags];

const RootTagValues: string[] = Object.values(RootTags);

export const isRootTag = (value: string): value is RootTag => RootTagValues.includes(value);
