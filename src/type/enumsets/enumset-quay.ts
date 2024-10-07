export const EnumsetQUAY = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
} as const;

export type QUAY = (typeof EnumsetQUAY)[keyof typeof EnumsetQUAY];
