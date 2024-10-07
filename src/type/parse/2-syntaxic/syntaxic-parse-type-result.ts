import { SuccessOrErrorResult } from '@type/success-or-error-result';
import { Tag } from '@type/tag/tag';

export interface SyntaxicParseData {
    depth: number;
    tag: Tag;
    xref: string | null;
    value: string | null;
}

export type SyntaxicParseResult = SuccessOrErrorResult<SyntaxicParseData>;
