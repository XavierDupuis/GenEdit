import { DatasetTag, DatasetTags } from '@type/tag/dataset-tag';
import { RecordTag, RecordTags } from '@type/tag/record-tag';
import { StdAttributeTag, StdAttributeTags } from '@type/tag/std-attribute-tag';

export const StdTags = {
    ...DatasetTags,
    ...RecordTags,
    ...StdAttributeTags,
} as const;

export type StdTag = DatasetTag | RecordTag | StdAttributeTag;

const StdTagValues: string[] = Object.values(StdTags);

export const isStdTag = (value: string): value is StdTag => StdTagValues.includes(value);
