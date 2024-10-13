import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { SourceCitation, toSourceCitation } from '@type/structures/substructures/source-citation';

interface TRANForNOTENoteStructure {
    value: string;
    MIME?: {
        value: string;
    };
    LANG?: {
        value: string;
    };
}

export interface NOTENoteStructure {
    NOTE: {
        value: string;
        MIME?: {
            value: string;
        };
        LANG?: {
            value: string;
        };
        TRAN?: TRANForNOTENoteStructure[];
        SOURCE_CITATION?: {
            value: SourceCitation;
        }[];
    };
}

export const toNOTENoteStructure = (entry: Entry): NOTENoteStructure | null => {
    if (!entry.value) {
        return null;
    }
    const noteStructure: NOTENoteStructure = {
        NOTE: { value: entry.value },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'MIME',
            entry => {
                if (entry.value) {
                    noteStructure.NOTE.MIME = { value: entry.value };
                }
            },
        ],
        [
            'LANG',
            entry => {
                if (entry.value) {
                    noteStructure.NOTE.LANG = { value: entry.value };
                }
            },
        ],
        [
            'TRAN',
            entry => {
                if (entry.value) {
                    const translation: TRANForNOTENoteStructure = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'MIME',
                            entry => {
                                if (entry.value) {
                                    translation.MIME = { value: entry.value };
                                }
                            },
                        ],
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
                    noteStructure.NOTE.TRAN ??= [];
                    noteStructure.NOTE.TRAN.push(translation);
                }
            },
        ],
        [
            'SOUR',
            entry => {
                const sourceCitation = toSourceCitation(entry);
                if (sourceCitation) {
                    noteStructure.NOTE.SOURCE_CITATION ??= [];
                    noteStructure.NOTE.SOURCE_CITATION.push({ value: sourceCitation });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return noteStructure;
};

export interface SNOTENoteStructure {
    SNOTE: {
        xref: CrossReferencePointer;
    };
}

export const toSNOTENoteStructure = (entry: Entry): SNOTENoteStructure | null => {
    if (!isCrossReferencePointer(entry.value)) {
        return null;
    }
    const noteStructure: SNOTENoteStructure = {
        SNOTE: { xref: entry.value },
    };
    return noteStructure;
};

export type NoteStructure = NOTENoteStructure | SNOTENoteStructure;
