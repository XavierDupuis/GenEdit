import { Taggable } from '@type/level-1/taggable';
import { Valuable } from '@type/level-1/valuable';

export interface Attribute<V = string> extends Taggable, Valuable<V> {}
