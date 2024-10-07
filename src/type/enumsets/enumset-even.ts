export const EnumsetEVEN = {
    CENS: 'CENS',
} as const;

export type EVEN = (typeof EnumsetEVEN)[keyof typeof EnumsetEVEN];
