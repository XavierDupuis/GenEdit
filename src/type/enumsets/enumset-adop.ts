export const EnumsetADOP = {
    HUSB: 'HUSB',
    WIFE: 'WIFE',
    BOTH: 'BOTH',
} as const;

export type ADOP = (typeof EnumsetADOP)[keyof typeof EnumsetADOP];
