export const EnumsetMEDI = {
    AUDIO: 'AUDIO',
    BOOK: 'BOOK',
    CARD: 'CARD',
    ELECTRONIC: 'ELECTRONIC',
    FICHE: 'FICHE',
    FILM: 'FILM',
    MAGAZINE: 'MAGAZINE',
    MANUSCRIPT: 'MANUSCRIPT',
    MAP: 'MAP',
    NEWSPAPER: 'NEWSPAPER',
    PHOTO: 'PHOTO',
    TOMBSTONE: 'TOMBSTONE',
    VIDEO: 'VIDEO',
    OTHER: 'OTHER',
} as const;

export type MEDI = (typeof EnumsetMEDI)[keyof typeof EnumsetMEDI];
