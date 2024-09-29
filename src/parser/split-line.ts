import { SuccessOrErrorResult } from '@type/parser/success-or-error-result';

export interface SplitLineData {
    first: string;
    second: string;
    third?: string;
}

export type SplitLineResult = SuccessOrErrorResult<SplitLineData>;

export const splitLine = (line: string): SplitLineResult => {
    if (line.trim().length === 0) {
        return { success: false, error: 'Empty line' };
    }
    const parts = line.split(' ');
    if (!parts.at(0) || !parts.at(1)) {
        return { success: false, error: 'Not enough parts' };
    }
    const first = parts[0];
    const second = parts[1];
    const third = parts.slice(2).join(' ') || undefined;
    return { success: true, first, second, third };
};
