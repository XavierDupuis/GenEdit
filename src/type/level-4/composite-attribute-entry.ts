import { AttributeEntry } from '@type/level-3/attribute-entry';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { CompositeEntry } from '@type/level-3/composite-entry';

export interface CompositeAttributeEntry<V = string, I = string> extends CompositeEntry<I>, AttributeEntry<V, I>, CompositeAttribute<V> {}
