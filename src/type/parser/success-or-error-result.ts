export type SuccessOrErrorResult<SuccessResultData> = { success: false; error: string } | ({ success: true } & SuccessResultData);
