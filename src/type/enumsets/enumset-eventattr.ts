export const EnumsetEVENTATTR = {
    CENS: 'CENS',
    NCHI: 'NCHI',
    RESI: 'RESI',
    FACT: 'FACT',
    EVEN: 'EVEN',
};

export type EVENTATTR = (typeof EnumsetEVENTATTR)[keyof typeof EnumsetEVENTATTR];
