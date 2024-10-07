import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Root } from '@type/parse/3-semantic/level-2/root';
import { RecordTag } from '@type/tag/record-tag';

export interface Record extends Root<CrossReferencePointer> {
    type: 'record';
    tag: RecordTag;
}
