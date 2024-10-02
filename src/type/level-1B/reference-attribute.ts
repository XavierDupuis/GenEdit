import { isRecordIdReference, RecordIdReference } from '@type/level-1B/record-id';
import { RecordTag } from '@type/tag/record-tag';
import { Attribute } from '@type/level-2/attribute';
import { Valuable } from '@type/level-1/valuable';

export interface ReferenceAttribute extends Attribute<RecordIdReference> {
    tag: RecordTag;
}

export const isReferenceAttribute = (value: Valuable): value is ReferenceAttribute => {
    return typeof value.value === 'string' && isRecordIdReference(value.value);
};
