export const EnumsetORDSTAT = {
    BIC: 'BIC',
    CANCELED: 'CANCELED',
    CHILD: 'CHILD',
    COMPLETED: 'COMPLETED',
    EXCLUDED: 'EXCLUDED',
    DNS: 'DNS',
    DNS_CAN: 'DNS_CAN',
    INFANT: 'INFANT',
    PRE_1970: 'PRE_1970',
    STILLBORN: 'STILLBORN',
    SUBMITTED: 'SUBMITTED',
    UNCLEARED: 'UNCLEARED',
} as const;

export type ORDSTAT = (typeof EnumsetORDSTAT)[keyof typeof EnumsetORDSTAT];
