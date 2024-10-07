import { SuccessOrErrorResult } from '@type/success-or-error-result';
import { Tag } from '@type/tag/tag';

export interface SyntaxicParseData {
    depth: number;
    tag: Tag;
    xref: string | null;
    value: string | null;
}

// interface RootSyntaxicParseData extends BaseSyntaxicParseData {
//     depth: 0;
//     tag: RootTag;
// }

// export interface DatasetDeclarationSyntaxicParseData extends RootSyntaxicParseData {
//     type: 'dataset';
//     depth: 0;
//     tag: DatasetTag;
// }

// export interface RecordDeclarationSyntaxicParseData extends RootSyntaxicParseData {
//     type: 'record';
//     depth: 0;
//     tag: RecordTag;
//     id: CrossReferencePointer;
// }

// export interface AttributeDeclarationSyntaxicParseData extends BaseSyntaxicParseData {
//     type: 'attribute';
//     tag: AttributeTag;
//     value: string | null;
// }

// export type SyntaxicParseData = RecordDeclarationSyntaxicParseData | DatasetDeclarationSyntaxicParseData | AttributeDeclarationSyntaxicParseData;

export type SyntaxicParseResult = SuccessOrErrorResult<SyntaxicParseData>;
