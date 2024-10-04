import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { ReferenceAttribute } from '@type/level-3/reference-attribute';
import { Entry } from '@type/level-4/entry';
import { RecordTag } from '@type/tag/record-tag';

export interface Reference extends Entry<CrossReferencePointer>, ReferenceAttribute {
    tag: RecordTag;
}
