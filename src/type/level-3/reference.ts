import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Attribute } from '@type/level-2/attribute';
import { AttributeTag } from '@type/tag/attribute-tag';

export interface Reference extends Attribute<CrossReferencePointer> {
    type: 'reference';
    tag: AttributeTag;
}
