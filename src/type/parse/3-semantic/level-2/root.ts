import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { BaseEntry } from '@type/parse/3-semantic/level-2/entry';
import { RootTag } from '@type/tag/root-tag';

export interface Root<X extends CrossReferencePointer | null = CrossReferencePointer | null> extends BaseEntry<null, X, string> {
    tag: RootTag;
}
