import { Attribute } from '@type/parse/3-semantic/level-2/attribute';
import { AttributeTag } from '@type/tag/attribute-tag';

export interface Property extends Attribute<string | null> {
    type: 'property';
    tag: AttributeTag;
}
