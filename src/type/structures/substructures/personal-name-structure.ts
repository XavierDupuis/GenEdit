import { Entry, isEntry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';
import { PersonalNamePieces, toPersonalNamePieces } from '@type/structures/substructures/personal-name-pieces';
import { SourceCitation, toSourceCitation } from '@type/structures/substructures/source-citation';

interface TYPEForPersonalNameStructure {
    value: string;
    PHRASE?: {
        value: string;
    };
}

interface TRANForPersonalNameStructure {
    value: string;
    LANG: {
        value: string;
    };
    PERSONAL_NAME_PIECES?: {
        value: PersonalNamePieces;
    };
}

export interface PersonalNameStructure {
    NAME: PersonalNamePieces & {
        value: string;
        TYPE?: TYPEForPersonalNameStructure;
        TRAN?: TRANForPersonalNameStructure[];
        NOTE_STRUCTURE?: {
            value: NoteStructure;
        }[];
        SOURCE_CITATION?: {
            value: SourceCitation;
        }[];
    };
}

export const entryToPersonalName = (entry: Entry): PersonalNameStructure | null => {
    if (!entry.value) {
        return null;
    }
    const personalNameStructure: PersonalNameStructure = {
        NAME: { value: entry.value, ...toPersonalNamePieces(entry.children.filter(isEntry)) },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    const type: TYPEForPersonalNameStructure = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'PHRASE',
                            entry => {
                                if (entry.value) {
                                    type.PHRASE = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    personalNameStructure.NAME.TYPE = type;
                }
            },
        ],
        // TODO PERSONAL_NAME_PIECES
        [
            'TRAN',
            entry => {
                if (entry.value) {
                    const translation: TRANForPersonalNameStructure = { value: entry.value, LANG: { value: '' } };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'LANG',
                            entry => {
                                if (entry.value) {
                                    translation.LANG = { value: entry.value };
                                }
                            },
                        ],
                        // TODO PERSONAL_NAME_PIECES
                    ]);
                    handleEntryChildren(entry, handlers);
                    personalNameStructure.NAME.TRAN ??= [];
                    personalNameStructure.NAME.TRAN.push(translation);
                }
            },
        ],
        [
            'NOTE',
            entry => {
                const noteNoteStructure = toNOTENoteStructure(entry);
                if (noteNoteStructure) {
                    personalNameStructure.NAME.NOTE_STRUCTURE ??= [];
                    personalNameStructure.NAME.NOTE_STRUCTURE.push({ value: noteNoteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteNoteStructure = toSNOTENoteStructure(entry);
                if (snoteNoteStructure) {
                    personalNameStructure.NAME.NOTE_STRUCTURE ??= [];
                    personalNameStructure.NAME.NOTE_STRUCTURE.push({ value: snoteNoteStructure });
                }
            },
        ],
        [
            'SOUR',
            entry => {
                const sourceCitation = toSourceCitation(entry);
                if (sourceCitation) {
                    personalNameStructure.NAME.SOURCE_CITATION ??= [];
                    personalNameStructure.NAME.SOURCE_CITATION.push({ value: sourceCitation });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return personalNameStructure;
};
