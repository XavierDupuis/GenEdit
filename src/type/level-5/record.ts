import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Root } from '@type/level-4/root';
import { RecordTag } from '@type/tag/record-tag';

export interface Record extends Root<CrossReferencePointer> {
    tag: RecordTag;
}
