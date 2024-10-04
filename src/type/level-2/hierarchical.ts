import { Childable } from '@type/level-1/childable';
import { Parentable } from '@type/level-1/parentable';

export interface Hierarchical /*<P = unknown>*/ extends Parentable /*<P>*/, Childable {}
