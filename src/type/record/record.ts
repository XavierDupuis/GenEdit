import { Attributable } from '@type/attribute/attributable';
import { RecordId } from '@type/record/record-id';
import { Taggable } from '@type/tag/taggable';

export interface Record extends Taggable, Attributable {
    id: RecordId;
}
