import { Identifiable } from '@type/level-1/identifiable';
import { Taggable } from '@type/level-1/taggable';

export interface Record<I = string> extends Taggable, Identifiable<I> {}
