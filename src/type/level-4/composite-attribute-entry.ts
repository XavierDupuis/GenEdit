import { AttributeRecord } from '@type/level-3/attribute-entry';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { CompositeRecord } from '@type/level-3/composite-entry';

export interface CompositeAttributeRecord<V = string, I = string> extends CompositeRecord<I>, AttributeRecord<V, I>, CompositeAttribute<V> {}
