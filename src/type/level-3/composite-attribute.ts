import { Attribute } from '@type/level-2/attribute';
import { Composite } from '@type/level-2/composite';

export interface CompositeAttribute<V = string> extends Attribute<V>, Composite {}
