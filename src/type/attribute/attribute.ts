import { Attributable } from '@type/attribute/attributable';
import { Taggable } from '@type/tag/taggable';

export interface Attribute extends Taggable, Attributable {
    value: string | null;
}
