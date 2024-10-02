import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { CompositeEntry } from '@type/level-3/composite-entry';

export type SemanticParseTypeResult<I = string, V = string> =
    | { handled: true; compositeAttribute: CompositeAttribute<V>; compositeEntry?: CompositeEntry<I> }
    | { handled: false };
