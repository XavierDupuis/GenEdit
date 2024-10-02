import { Attribute } from '@type/level-2/attribute';
import { Entry } from '@type/level-2/entry';

export interface AttributeEntry<V = string, I = string> extends Attribute<V>, Entry<I> {}
