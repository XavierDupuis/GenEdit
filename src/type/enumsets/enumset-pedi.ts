export const EnumsetPEDI = {
    ADOPTED: 'ADOPTED',
    BIRTH: 'BIRTH',
    FOSTER: 'FOSTER',
    SEALING: 'SEALING',
    OTHER: 'OTHER',
};

export type PEDI = (typeof EnumsetPEDI)[keyof typeof EnumsetPEDI];
