import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';

export type SemanticParseTypeResult<I = string | null, V = string | null> =
    | ({ handled: true } & IdentifiableHierarchicalAttribute<I, V>)
    | { handled: false };
