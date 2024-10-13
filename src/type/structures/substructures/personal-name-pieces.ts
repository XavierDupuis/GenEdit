import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { StructureEntryHandlers, handleEntries } from '@type/structures/structure-entry-handlers';

export interface PersonalNamePieces {
    NPFX?: {
        value: string;
    }[];
    GIVN?: {
        value: string;
    }[];
    NICK?: {
        value: string;
    }[];
    SPFX?: {
        value: string;
    }[];
    SURN?: {
        value: string;
    }[];
    NSFX?: {
        value: string;
    }[];
}

export const toPersonalNamePieces = (entries: Entry[]): PersonalNamePieces | null => {
    const personalNamePieces: PersonalNamePieces = {};
    const handlers: StructureEntryHandlers = new Map([
        [
            'NPFX',
            entry => {
                if (entry.value) {
                    personalNamePieces.NPFX ??= [];
                    personalNamePieces.NPFX.push({ value: entry.value });
                }
            },
        ],
        [
            'GIVN',
            entry => {
                if (entry.value) {
                    personalNamePieces.GIVN ??= [];
                    personalNamePieces.GIVN.push({ value: entry.value });
                }
            },
        ],
        [
            'NICK',
            entry => {
                if (entry.value) {
                    personalNamePieces.NICK ??= [];
                    personalNamePieces.NICK.push({ value: entry.value });
                }
            },
        ],
        [
            'SPFX',
            entry => {
                if (entry.value) {
                    personalNamePieces.SPFX ??= [];
                    personalNamePieces.SPFX.push({ value: entry.value });
                }
            },
        ],
        [
            'SURN',
            entry => {
                if (entry.value) {
                    personalNamePieces.SURN ??= [];
                    personalNamePieces.SURN.push({ value: entry.value });
                }
            },
        ],
        [
            'NSFX',
            entry => {
                if (entry.value) {
                    personalNamePieces.NSFX ??= [];
                    personalNamePieces.NSFX.push({ value: entry.value });
                }
            },
        ],
    ]);

    handleEntries(entries, handlers);
    return personalNamePieces;
};
