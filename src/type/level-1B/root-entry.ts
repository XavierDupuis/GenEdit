import { Attribute } from '@type/level-2/attribute';
import { Record } from '@type/level-2/entry';
import { RootTag } from '@type/tag/root-tag';

export interface RootRecord<I = string> extends Record<I> {
    tag: RootTag;
}

export interface RootAttributeRecord<IV = string> extends Record<IV>, Attribute<IV> {
    tag: RootTag;
}
