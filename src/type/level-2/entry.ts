import { Identifiable } from '@type/level-1/identifiable';
import { Taggable } from '@type/level-1/taggable';

export interface Entry<I = string> extends Taggable, Identifiable<I> {}
