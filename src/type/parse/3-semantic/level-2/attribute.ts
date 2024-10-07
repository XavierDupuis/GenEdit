import { BaseEntry } from '@type/parse/3-semantic/level-2/entry';
import { AttributeTag } from '@type/tag/attribute-tag';

export interface Attribute<V extends string | null> extends BaseEntry<V, null, string> {
    tag: AttributeTag;
}
