import { CompositeAttributeRecord } from '@type/level-4/composite-attribute-entry';
import { DatasetTags } from '@type/tag/dataset-tag';
import { RootTag } from '@type/tag/root-tag';

export const HEADER: CompositeAttributeRecord<RootTag> = { tag: DatasetTags.HEAD, id: DatasetTags.HEAD, value: DatasetTags.HEAD, attributes: [] };
