import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { StructureEntryHandlers, handleEntryChildren } from '@type/structures/structure-entry-handlers';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';

interface TRANForPlaceStructure {
    value: string;
    LANG?: {
        value: string;
    };
}

interface MAPForPlaceStructure {
    value: string;
    LATI: {
        value: string;
    };
    LONG: {
        value: string;
    };
}

interface EXIDForPlaceStructure {
    value: string;
    TYPE?: {
        value: string;
    };
}

export interface PlaceStructure {
    PLAC: {
        value: string;
        FORM?: {
            value: string;
        };
        LANG?: {
            value: string;
        };
        TRAN?: TRANForPlaceStructure[];
        MAP?: MAPForPlaceStructure;
        EXID?: EXIDForPlaceStructure[];
        NOTE_STRUCTURE?: {
            value: NoteStructure;
        }[];
    };
}

export const toPlaceStructure = (entry: Entry): PlaceStructure | null => {
    if (!entry.value) {
        return null;
    }
    const placeStructure: PlaceStructure = {
        PLAC: { value: entry.value },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'FORM',
            entry => {
                if (entry.value) {
                    placeStructure.PLAC.FORM = { value: entry.value };
                }
            },
        ],
        [
            'LANG',
            entry => {
                if (entry.value) {
                    placeStructure.PLAC.LANG = { value: entry.value };
                }
            },
        ],
        [
            'TRAN',
            entry => {
                if (entry.value) {
                    const translation: TRANForPlaceStructure = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'LANG',
                            entry => {
                                if (entry.value) {
                                    translation.LANG = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    placeStructure.PLAC.TRAN ??= [];
                    placeStructure.PLAC.TRAN.push(translation);
                }
            },
        ],
        [
            'MAP',
            entry => {
                if (entry.value) {
                    const map: MAPForPlaceStructure = { value: entry.value, LATI: { value: '' }, LONG: { value: '' } };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'LATI',
                            entry => {
                                if (entry.value) {
                                    map.LATI = { value: entry.value };
                                }
                            },
                        ],
                        [
                            'LONG',
                            entry => {
                                if (entry.value) {
                                    map.LONG = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    placeStructure.PLAC.MAP = map;
                }
            },
        ],
        [
            'EXID',
            entry => {
                if (entry.value) {
                    const exid: EXIDForPlaceStructure = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'TYPE',
                            entry => {
                                if (entry.value) {
                                    exid.TYPE = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    placeStructure.PLAC.EXID ??= [];
                    placeStructure.PLAC.EXID.push(exid);
                }
            },
        ],
        [
            'NOTE',
            entry => {
                const noteNoteStructure = toNOTENoteStructure(entry);
                if (noteNoteStructure) {
                    placeStructure.PLAC.NOTE_STRUCTURE ??= [];
                    placeStructure.PLAC.NOTE_STRUCTURE.push({ value: noteNoteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteNoteStructure = toSNOTENoteStructure(entry);
                if (snoteNoteStructure) {
                    placeStructure.PLAC.NOTE_STRUCTURE ??= [];
                    placeStructure.PLAC.NOTE_STRUCTURE.push({ value: snoteNoteStructure });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return placeStructure;
};
