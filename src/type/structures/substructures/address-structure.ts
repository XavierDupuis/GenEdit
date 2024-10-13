import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';

export interface AddressStructure {
    ADDR: {
        value: string;
        ADR1?: {
            value: string;
        };
        ADR2?: {
            value: string;
        };
        ADR3?: {
            value: string;
        };
        CITY?: {
            value: string;
        };
        STAE?: {
            value: string;
        };
        POST?: {
            value: string;
        };
        CTRY?: {
            value: string;
        };
    };
}

export const toAddressStructure = (entry: Entry): AddressStructure | null => {
    if (!entry.value) {
        return null;
    }
    const addressStructure: AddressStructure = {
        ADDR: { value: entry.value },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'ADR1',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.ADR1 = { value: entry.value };
                }
            },
        ],
        [
            'ADR2',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.ADR2 = { value: entry.value };
                }
            },
        ],
        [
            'ADR3',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.ADR3 = { value: entry.value };
                }
            },
        ],
        [
            'CITY',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.CITY = { value: entry.value };
                }
            },
        ],
        [
            'STAE',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.STAE = { value: entry.value };
                }
            },
        ],
        [
            'POST',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.POST = { value: entry.value };
                }
            },
        ],
        [
            'CTRY',
            entry => {
                if (entry.value) {
                    addressStructure.ADDR.CTRY = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return addressStructure;
};
