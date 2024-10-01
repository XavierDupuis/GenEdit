import { Attributable } from '@type/attribute/attributable';
import { Rootable } from '@type/root/rootable';

export type SemanticParseTypeResult = { handled: true; attributable: Attributable; rootable?: Rootable } | { handled: false };
