import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';

export interface DateValue {
    DATE: {
        value: string;
        TIME?: {
            value: string;
        };
        PHRASE?: {
            value: string;
        };
    };
}

export const toDateValue = (entry: Entry): DateValue | null => {
    if (!entry.value) {
        return null;
    }
    const dateValue: DateValue = {
        DATE: { value: entry.value },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'TIME',
            entry => {
                if (entry.value) {
                    dateValue.DATE.TIME = { value: entry.value };
                }
            },
        ],
        [
            'PHRASE',
            entry => {
                if (entry.value) {
                    dateValue.DATE.PHRASE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return dateValue;
};
