export const EnumsetFAMCSTAT = {
    CHALLENGED: 'CHALLENGED',
    DISPROVEN: 'DISPROVEN',
    PROVEN: 'PROVEN',
} as const;

export type FAMCSTAT = (typeof EnumsetFAMCSTAT)[keyof typeof EnumsetFAMCSTAT];
