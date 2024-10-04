import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { isReferenceAttribute, ReferenceAttribute } from '@type/level-3/reference-attribute';
import { Entry } from '@type/level-4/entry';
import { AttributeTag } from '@type/tag/attribute-tag';

export interface Reference extends Entry<CrossReferencePointer>, ReferenceAttribute {
    tag: AttributeTag;
}

export const isReference = (value: unknown): value is Reference => {
    return isReferenceAttribute(value);
};
