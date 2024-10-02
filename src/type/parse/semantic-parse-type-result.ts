import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { CompositeAttributeRecord } from '@type/level-4/composite-attribute-entry';

export type SemanticParseTypeResult<I = string, V = string> =
    | ({ handled: true } & (CompositeAttribute<V> | CompositeAttributeRecord<I, V>))
    | { handled: false };
