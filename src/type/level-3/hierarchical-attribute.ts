import { Identifiable } from '@type/level-1/identifiable';
import { Attribute } from '@type/level-2/attribute';
import { Hierarchical } from '@type/level-2/hierarchical';

export interface IdentifiableHierarchicalAttribute<I = string | null, V = string | null /*, P = unknown*/>
    extends Identifiable<I>,
        Attribute<V>,
        Hierarchical /*<P>*/ {}
