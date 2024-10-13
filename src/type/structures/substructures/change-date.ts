import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';

interface DATEForChangeDate {
    value: string;
    TIME?: {
        value: string;
    };
}

export interface ChangeDate {
    CHAN: {
        DATE: DATEForChangeDate;
        NOTE_STRUCTURE?: {
            value: NoteStructure;
        }[];
    };
}

export const toChangeDate = (entry: Entry): ChangeDate | null => {
    const changeDate: ChangeDate = {
        CHAN: { DATE: { value: '' } },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'DATE',
            entry => {
                if (entry.value) {
                    const date: DATEForChangeDate = { value: entry.value };

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
                    changeDate.CHAN.DATE = date;
                }
            },
        ],
        [
            'NOTE',
            entry => {
                const noteStructure = toNOTENoteStructure(entry);
                if (noteStructure) {
                    changeDate.CHAN.NOTE_STRUCTURE ??= [];
                    changeDate.CHAN.NOTE_STRUCTURE.push({ value: noteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteStructure = toSNOTENoteStructure(entry);
                if (snoteStructure) {
                    changeDate.CHAN.NOTE_STRUCTURE ??= [];
                    changeDate.CHAN.NOTE_STRUCTURE.push({ value: snoteStructure });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return changeDate;
};
