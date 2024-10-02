import { Attribute } from '@type/level-2/attribute';
import { Record } from '@type/level-2/record';

export interface AttributeRecord<V = string, I = string> extends Attribute<V>, Record<I> {}
