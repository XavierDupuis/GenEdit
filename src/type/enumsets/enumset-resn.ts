export const EnumsetRESN = {
    CONFIDENTIAL: 'CONFIDENTIAL',
    LOCKED: 'LOCKED',
    PRIVACY: 'PRIVACY',
} as const;

export type RESN = (typeof EnumsetRESN)[keyof typeof EnumsetRESN];
