export const EnumsetNAMETYPE = {
    AKA: 'AKA',
    BIRTH: 'BIRTH',
    IMMIGRANT: 'IMMIGRANT',
    MAIDEN: 'MAIDEN',
    MARRIED: 'MARRIED',
    PROFESSIONAL: 'PROFESSIONAL',
    OTHER: 'OTHER',
} as const;

export type NAMETYPE = (typeof EnumsetNAMETYPE)[keyof typeof EnumsetNAMETYPE];
