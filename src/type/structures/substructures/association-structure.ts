import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Entry, isEntry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';
import { toSourceCitation } from '@type/structures/substructures/source-citation';
import { TODO } from '@type/todo';

export interface AssociationStructure {
    ASSO: {
        xref: CrossReferencePointer;
        PHRASE?: {
            value: string;
        };
        ROLE: {
            value: string;
            PHRASE?: {
                value: string;
            };
        };
        NOTE_STRUCTURE?: {
            value: TODO;
        }[];
        SOURCE_CITATION?: {
            value: TODO;
        }[];
    };
}

export const toAssociationStructure = (entry: Entry): AssociationStructure | null => {
    if (!isCrossReferencePointer(entry.value)) {
        return null;
    }
    const associationStructure: AssociationStructure = {
        ASSO: { xref: entry.value, ROLE: { value: '' } },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'PHRASE',
            entry => {
                if (entry.value) {
                    associationStructure.ASSO.PHRASE = { value: entry.value };
                }
            },
        ],
        [
            'ROLE',
            entry => {
                if (entry.value) {
                    associationStructure.ASSO.ROLE = { value: entry.value };
                }
            },
        ],
        [
            'NOTE',
            entry => {
                const noteStructure = toNOTENoteStructure(entry);
                if (noteStructure) {
                    associationStructure.ASSO.NOTE_STRUCTURE ??= [];
                    associationStructure.ASSO.NOTE_STRUCTURE.push({ value: noteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteStructure = toSNOTENoteStructure(entry);
                if (snoteStructure) {
                    associationStructure.ASSO.NOTE_STRUCTURE ??= [];
                    associationStructure.ASSO.NOTE_STRUCTURE.push({ value: snoteStructure });
                }
            },
        ],
        [
            'SOUR',
            entry => {
                const sourceCitation = toSourceCitation(entry);
                if (sourceCitation) {
                    associationStructure.ASSO.SOURCE_CITATION ??= [];
                    associationStructure.ASSO.SOURCE_CITATION.push({ value: sourceCitation });
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return associationStructure;
};
