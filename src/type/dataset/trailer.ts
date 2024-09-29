import { Attributable } from '@type/attribute/attributable';
import { DatasetTags } from '@type/tag/dataset-tag';
import { Taggable } from '@type/tag/taggable';

export interface Trailer extends Taggable, Attributable {}

export const TRAILER: Trailer = { tag: DatasetTags.TRLR, attributes: [] };
