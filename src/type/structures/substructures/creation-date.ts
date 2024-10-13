import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { StructureEntryHandlers, handleEntryChildren } from '@type/structures/structure-entry-handlers';

interface DATEForCreationDate {
    value: string;
    TIME?: {
        value: string;
    };
}

export interface CreationDate {
    CREA: {
        DATE: DATEForCreationDate;
    };
}

export const toCreationDate = (entry: Entry): CreationDate | null => {
    const creationDate: CreationDate = {
        CREA: { DATE: { value: '' } },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'DATE',
            entry => {
                if (entry.value) {
                    const date: DATEForCreationDate = { value: entry.value };

                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'TIME',
                            entry => {
                                if (entry.value) {
                                    date.TIME = { value: entry.value };
                                }
                            },
                        ],
                    ]);

                    handleEntryChildren(entry, handlers);
                    creationDate.CREA.DATE = date;
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return creationDate;
};
