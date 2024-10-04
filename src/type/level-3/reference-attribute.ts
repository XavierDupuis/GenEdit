import { RecordTag } from '@type/tag/record-tag';
import { Attribute } from '@type/level-2/attribute';
import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';

export interface ReferenceAttribute extends Attribute<CrossReferencePointer> {
    tag: RecordTag;
}

export const isReferenceAttribute = (value: unknown): value is ReferenceAttribute => {
    return typeof value === 'object' && value !== null && 'value' in value && typeof value.value === 'string' && isCrossReferencePointer(value.value);
};
