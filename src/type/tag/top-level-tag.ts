import { DatasetTags } from '@type/tag/dataset-tag';
import { RecordTags } from '@type/tag/record-tag';

export const TopLevelTags = {
    ...DatasetTags,
    ...RecordTags,
} as const;

export type TopLevelTag = keyof typeof TopLevelTags;

const TopLevelTagValues: string[] = Object.values(TopLevelTags);

export const isTopLevelTag = (value: string): value is TopLevelTag => TopLevelTagValues.includes(value);
