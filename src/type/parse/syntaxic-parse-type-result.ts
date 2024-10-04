import { CrossReference } from '@type/cross-reference/cross-reference';
import { SuccessOrErrorResult } from '@type/success-or-error-result';
import { AttributeTag } from '@type/tag/attribute-tag';
import { DatasetTag } from '@type/tag/dataset-tag';
import { RecordTag } from '@type/tag/record-tag';
import { RootTag } from '@type/tag/root-tag';
import { Tag } from '@type/tag/tag';

export type SyntaxicParseType = 'dataset' | 'record' | 'attribute';

interface BaseSyntaxicParseData {
    type: SyntaxicParseType;
    depth: number;
    tag: Tag;
}

interface RootSyntaxicParseData extends BaseSyntaxicParseData {
    depth: 0;
    tag: RootTag;
}

export interface DatasetDeclarationSyntaxicParseData extends RootSyntaxicParseData {
    type: 'dataset';
    depth: 0;
    tag: DatasetTag;
}

export interface RecordDeclarationSyntaxicParseData extends RootSyntaxicParseData {
    type: 'record';
    depth: 0;
    tag: RecordTag;
    id: CrossReference;
}

export interface AttributeDeclarationSyntaxicParseData extends BaseSyntaxicParseData {
    type: 'attribute';
    tag: AttributeTag;
    value: string | null;
}

export type SyntaxicParseData = RecordDeclarationSyntaxicParseData | DatasetDeclarationSyntaxicParseData | AttributeDeclarationSyntaxicParseData;

export type SyntaxicParseResult = SuccessOrErrorResult<SyntaxicParseData>;
