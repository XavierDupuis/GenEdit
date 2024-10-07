import { CrossReferencePointer } from '@type/cross-reference/cross-reference';

export interface CrossReferenceable<X extends CrossReferencePointer | null = CrossReferencePointer> {
    xref: X;
}
