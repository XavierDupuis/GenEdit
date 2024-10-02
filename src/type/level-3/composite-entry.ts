import { Composite } from '@type/level-2/composite';
import { Entry } from '@type/level-2/entry';

export interface CompositeEntry<I = string> extends Composite, Entry<I> {}
