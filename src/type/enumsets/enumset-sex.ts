export const EnumsetSEX = {
    M: 'M',
    F: 'F',
    X: 'X',
    U: 'U',
} as const;

export type SEX = (typeof EnumsetSEX)[keyof typeof EnumsetSEX];
