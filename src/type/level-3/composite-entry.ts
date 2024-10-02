import { Composite } from '@type/level-2/composite';
import { Record } from '@type/level-2/record';

export interface CompositeRecord<I = string> extends Composite, Record<I> {}
