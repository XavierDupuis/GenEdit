import { Attributable } from '@type/attribute/attributable';
import { Identifiable } from '@type/identity/identifiable';
import { RootTag } from '@type/tag/root-tag';

export interface Rootable extends Attributable, Identifiable {
    tag: RootTag;
}
