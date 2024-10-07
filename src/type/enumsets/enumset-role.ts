export const EnumsetROLE = {
    CHIL: 'CHIL',
    CLERGY: 'CLERGY',
    FATH: 'FATH',
    FRIEND: 'FRIEND',
    GODP: 'GODP',
    HUSB: 'HUSB',
    MOTH: 'MOTH',
    MULTIPLE: 'MULTIPLE',
    NGHBR: 'NGHBR',
    OFFICIATOR: 'OFFICIATOR',
    PARENT: 'PARENT',
    SPOU: 'SPOU',
    WIFE: 'WIFE',
    WITN: 'WITN',
    OTHER: 'OTHER',
} as const;

export type ROLE = (typeof EnumsetROLE)[keyof typeof EnumsetROLE];
