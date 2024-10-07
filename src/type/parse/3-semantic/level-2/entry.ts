import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Childable } from '@type/parse/3-semantic/level-1/childable';
import { CrossReferenceable } from '@type/parse/3-semantic/level-1/cross-referenceable';
import { Identifiable } from '@type/parse/3-semantic/level-1/identifiable';
import { Parentable } from '@type/parse/3-semantic/level-1/parentable';
import { Taggable } from '@type/parse/3-semantic/level-1/taggable';
import { Valuable } from '@type/parse/3-semantic/level-1/valuable';
import { Dataset } from '@type/parse/3-semantic/level-3/dataset';
import { Property } from '@type/parse/3-semantic/level-3/property';
import { Record } from '@type/parse/3-semantic/level-3/record';
import { Reference } from '@type/parse/3-semantic/level-3/reference';

type SemanticEntryType = 'dataset' | 'record' | 'reference' | 'property';

export interface BaseEntry<
    V extends string | null,
    X extends CrossReferencePointer | null,
    I extends string,
    P = unknown, // P = Entry | null = null,
    C = unknown, // P = Entry | null = null,
> extends Childable<C>,
        Parentable<P>,
        Taggable,
        Identifiable<I>,
        Valuable<V>,
        CrossReferenceable<X> {
    type: SemanticEntryType;
}

export type Entry = Dataset | Record | Property | Reference;

export const isEntry = (value: unknown): value is Entry => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'type' in value &&
        (value.type === 'dataset' || value.type === 'record' || value.type === 'property' || value.type === 'reference')
    );
};
