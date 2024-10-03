import { SuccessOrErrorResult } from '@type/success-or-error-result';

export interface SplitLineData {
    first: string;
    second: string;
    third?: string;
}

export type SplitLineResult = SuccessOrErrorResult<SplitLineData>;
