import { SuccessOrErrorResult } from '@type/parser/success-or-error-result';
import { RecordId, isRecordId } from '@type/record/record-id';
import { SplitLineData } from '../split-line';
import { AttributeTag, isAttributeTag } from '@type/tag/attribute-tag';
import { DatasetTag, isDatasetTag } from '@type/tag/dataset-tag';
import { RecordTag, isRecordTag } from '@type/tag/record-tag';
import { Tag } from '@type/tag/tag';
import { RootTag } from '@type/tag/root-tag';

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
    id: RecordId;
}

export interface AttributeDeclarationSyntaxicParseData extends BaseSyntaxicParseData {
    type: 'attribute';
    tag: AttributeTag;
    value: string | null;
}

export type SyntaxicParseData = RecordDeclarationSyntaxicParseData | DatasetDeclarationSyntaxicParseData | AttributeDeclarationSyntaxicParseData;

export type SyntaxicParseResult = SuccessOrErrorResult<SyntaxicParseData>;

export const syntaxicParseLine = ({ first, second, third }: SplitLineData): SyntaxicParseResult => {
    const depth = parseInt(first, 10);
    if (Number.isNaN(depth)) {
        return { success: false, error: `Invalid depth '${depth}'` };
    }

    if (depth === 0) {
        if (second.at(0) === '@' && third) {
            const id = second.slice(1, -1);
            const tag = third;
            if (isRecordId(id) && isRecordTag(tag)) {
                return {
                    success: true,
                    type: 'record',
                    depth,
                    id,
                    tag,
                };
            } else {
                return { success: false, error: `Invalid record declaration with second '${second}' and third '${third ?? '<Empty string>'}'` };
            }
        }

        const tag = second;
        if (isDatasetTag(tag)) {
            return {
                success: true,
                type: 'dataset',
                depth,
                tag,
            };
        }

        return { success: false, error: `Invalid top level declaration with second '${second}'` };
    }

    const tag = second;
    if (isAttributeTag(tag)) {
        return {
            success: true,
            type: 'attribute',
            depth,
            tag,
            value: third ?? null,
        };
    }

    return { success: false, error: `Unhandled case with second '${second}'` };
};
