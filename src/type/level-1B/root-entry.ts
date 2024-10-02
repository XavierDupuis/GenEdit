import { Attribute } from '@type/level-2/attribute';
import { Entry } from '@type/level-2/entry';
import { RootTag } from '@type/tag/root-tag';

export interface RootEntry<I = string> extends Entry<I> {
    tag: RootTag;
}

export interface RootAttributeEntry<IV = string> extends Entry<IV>, Attribute<IV> {
    tag: RootTag;
}
