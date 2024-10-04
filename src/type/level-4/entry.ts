import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';

export interface Entry<V = string | null> extends IdentifiableHierarchicalAttribute<null, V> {
    id: null;
}
