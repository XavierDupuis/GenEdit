import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';
import { TODO } from '@type/todo';

interface DATAForSourceCitation {
    DATE_VALUE?: {
        value: TODO;
    };
    TEXT?: TEXTForDATAForSourceCitation;
}

interface TEXTForDATAForSourceCitation {
    value: string;
    MIME?: {
        value: string;
    };
    LANG?: {
        value: string;
    };
}

interface EVENForSourceCitation {
    value: string;
    PHRASE?: {
        value: string;
    };
    ROLE?: ROLEForEVENForSourceCitation;
}

interface ROLEForEVENForSourceCitation {
    value: string;
    PHRASE?: {
        value: string;
    };
}

export interface SourceCitation {
    SOUR: {
        xref: CrossReferencePointer;
        PAGE?: {
            value: string;
        };
        DATA?: DATAForSourceCitation;
        EVEN?: EVENForSourceCitation;
        QUAY?: {
            value: string;
        };
        MULTIMEIDA_LINK?: {
            value: TODO;
        }[];
        NOTE_STRUCTURE?: {
            value: NoteStructure;
        }[];
    };
}

export const toSourceCitation = (entry: Entry): SourceCitation | null => {
    if (!isCrossReferencePointer(entry.value)) {
        return null;
    }
    const sourceCitation: SourceCitation = {
        SOUR: { xref: entry.value },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'PAGE',
            entry => {
                if (entry.value) {
                    sourceCitation.SOUR.PAGE = { value: entry.value };
                }
            },
        ],
        [
            'DATA',
            entry => {
                sourceCitation.SOUR.DATA ??= {};
                const data: DATAForSourceCitation = {};
                const handlers: StructureEntryHandlers = new Map([
                    [
                        'DATE',
                        entry => {
                            if (entry.value) {
                                data.DATE_VALUE = { value: entry.value };
                            }
                        },
                    ],
                    [
                        'TEXT',
                        entry => {
                            if (entry.value) {
                                const text: TEXTForDATAForSourceCitation = { value: entry.value };
                                const handlers: StructureEntryHandlers = new Map([
                                    [
                                        'MIME',
                                        entry => {
                                            if (entry.value) {
                                                text.MIME = { value: entry.value };
                                            }
                                        },
                                    ],
                                    [
                                        'LANG',
                                        entry => {
                                            if (entry.value) {
                                                text.LANG = { value: entry.value };
                                            }
                                        },
                                    ],
                                ]);
                                handleEntryChildren(entry, handlers);
                                data.TEXT = text;
                            }
                        },
                    ],
                ]);
                handleEntryChildren(entry, handlers);
                sourceCitation.SOUR.DATA = data;
            },
        ],
        [
            'EVEN',
            entry => {
                if (entry.value) {
                    const even: EVENForSourceCitation = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'PHRASE',
                            entry => {
                                if (entry.value) {
                                    even.PHRASE = { value: entry.value };
                                }
                            },
                        ],
                        [
                            'ROLE',
                            entry => {
                                if (entry.value) {
                                    const role: ROLEForEVENForSourceCitation = { value: entry.value };
                                    const handlers: StructureEntryHandlers = new Map([
                                        [
                                            'PHRASE',
                                            entry => {
                                                if (entry.value) {
                                                    role.PHRASE = { value: entry.value };
                                                }
                                            },
                                        ],
                                    ]);
                                    handleEntryChildren(entry, handlers);
                                    even.ROLE = role;
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    sourceCitation.SOUR.EVEN = even;
                }
            },
        ],
        [
            'QUAY',
            entry => {
                if (entry.value) {
                    sourceCitation.SOUR.QUAY = { value: entry.value };
                }
            },
        ],
        // TODO MULTIMEDIA_LINK
        [
            'NOTE',
            entry => {
                const noteStructure = toNOTENoteStructure(entry);
                if (noteStructure) {
                    sourceCitation.SOUR.NOTE_STRUCTURE ??= [];
                    sourceCitation.SOUR.NOTE_STRUCTURE.push({ value: noteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteStructure = toSNOTENoteStructure(entry);
                if (snoteStructure) {
                    sourceCitation.SOUR.NOTE_STRUCTURE ??= [];
                    sourceCitation.SOUR.NOTE_STRUCTURE.push({ value: snoteStructure });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return sourceCitation;
};
