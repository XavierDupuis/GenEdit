import { isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { SplitLineData } from '@type/parse/split-line-result';
import { SyntaxicParseResult } from '@type/parse/syntaxic-parse-type-result';
import { isTag } from '@type/tag/tag';

export const syntaxicParseLine = ({ first, second, third }: SplitLineData): SyntaxicParseResult => {
    const depth = parseInt(first, 10);
    if (Number.isNaN(depth)) {
        return { success: false, error: `Invalid depth '${depth}'` };
    }

    const isSecondTag = isTag(second);
    if (isSecondTag) {
        return {
            success: true,
            depth,
            xref: null,
            tag: second,
            value: third ?? null,
        };
    }

    const isThirdTag = isTag(third);
    if (isThirdTag) {
        const isSecondCrossReferencePointer = isCrossReferencePointer(second);
        if (isSecondCrossReferencePointer) {
            return {
                success: true,
                depth,
                xref: second,
                tag: third,
                value: null,
            };
        }
    }

    return { success: false, error: `Unhandled case with second '${second}' and third '${third ?? '<Empty string>'}'` };
};
