import { Attribute } from '@type/level-2/attribute';
import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { AttributeTag, isAttributeTag } from '@type/tag/attribute-tag';

export interface ReferenceAttribute extends Attribute<CrossReferencePointer> {
    tag: AttributeTag;
}

export const isReferenceAttribute = (value: unknown): value is ReferenceAttribute => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'tag' in value &&
        isAttributeTag(value.tag) &&
        'value' in value &&
        isCrossReferencePointer(value.value)
    );
};
