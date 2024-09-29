import { Attributable } from '@type/attribute/attributable';
import { DatasetTags } from '@type/tag/dataset-tag';
import { Taggable } from '@type/tag/taggable';

export interface Header extends Taggable, Attributable {}

export const HEADER: Header = { tag: DatasetTags.HEAD, attributes: [] };
