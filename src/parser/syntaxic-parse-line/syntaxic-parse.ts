import { isRecordId } from '@type/level-1B/record-id';
import { SyntaxicParseResult } from '@type/parse/syntaxic-parse-type-result';
import { isAttributeTag } from '@type/tag/attribute-tag';
import { isDatasetTag } from '@type/tag/dataset-tag';
import { isRecordTag } from '@type/tag/record-tag';
import { SplitLineData } from '../split-line';

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
