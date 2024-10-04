import { DatasetTags } from '@type/tag/dataset-tag';
import { RecordTags } from '@type/tag/record-tag';

export const RootTags = {
    ...DatasetTags,
    ...RecordTags,
} as const;

export type RootTag = (typeof RootTags)[keyof typeof RootTags];

const RootTagValues: string[] = Object.values(RootTags);

export const isRootTag = (value: string): value is RootTag => RootTagValues.includes(value);
