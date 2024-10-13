import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntries, handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { AddressStructure, toAddressStructure } from '@type/structures/substructures/address-structure';
import { DateValue, toDateValue } from '@type/structures/substructures/date-value';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';
import { PlaceStructure, toPlaceStructure } from '@type/structures/substructures/place-structure';
import { SourceCitation, toSourceCitation } from '@type/structures/substructures/source-citation';
import { Tag } from '@type/tag/tag';
import { TODO } from '@type/todo';

interface SDATEForEventDetail {
    value: string;
    TIME?: {
        value: string;
    };
    PHRASE?: {
        value: string;
    };
}

export interface EventDetail {
    DATE_VALUE?: {
        value: DateValue;
    };
    PLACE_STRUCTURE?: {
        value: PlaceStructure;
    };
    ADDRESS_STRUCTURE?: {
        value: AddressStructure;
    };
    PHON?: {
        value: string;
    }[];
    EMAIL?: {
        value: string;
    }[];
    FAX?: {
        value: string;
    }[];
    WWW?: {
        value: string;
    }[];
    AGNC?: {
        value: string;
    };
    RELI?: {
        value: string;
    };
    CAUS?: {
        value: string;
    };
    RESN?: {
        value: string;
    };
    SDATE?: SDATEForEventDetail;
    ASSOCIATION_STRUCTURE?: {
        value: TODO;
    }[];
    NOTE_STRUCTURE?: {
        value: NoteStructure;
    }[];
    SOURCE_CITATION?: {
        value: SourceCitation;
    }[];
    MULTIMEDIA_LINK?: {
        value: TODO;
    }[];
    UID?: {
        value: string;
    }[];
}

export const toEventDetail = (entries: Entry[]): EventDetail | null => {
    const eventDetail: EventDetail = {};
    const handlers = new Map<Tag, (entry: Entry) => void>([
        [
            'DATE',
            entry => {
                const dateValue = toDateValue(entry);
                if (dateValue) {
                    eventDetail.DATE_VALUE = { value: dateValue };
                }
            },
        ],
        [
            'PLAC',
            entry => {
                const placeStructure = toPlaceStructure(entry);
                if (placeStructure) {
                    eventDetail.PLACE_STRUCTURE = { value: placeStructure };
                }
            },
        ],
        [
            'ADDR',
            entry => {
                const addressStructure = toAddressStructure(entry);
                if (addressStructure) {
                    eventDetail.ADDRESS_STRUCTURE = { value: addressStructure };
                }
            },
        ],
        [
            'PHON',
            entry => {
                if (entry.value) {
                    eventDetail.PHON ??= [];
                    eventDetail.PHON.push({ value: entry.value });
                }
            },
        ],
        [
            'EMAIL',
            entry => {
                if (entry.value) {
                    eventDetail.EMAIL ??= [];
                    eventDetail.EMAIL.push({ value: entry.value });
                }
            },
        ],
        [
            'FAX',
            entry => {
                if (entry.value) {
                    eventDetail.FAX ??= [];
                    eventDetail.FAX.push({ value: entry.value });
                }
            },
        ],
        [
            'WWW',
            entry => {
                if (entry.value) {
                    eventDetail.WWW ??= [];
                    eventDetail.WWW.push({ value: entry.value });
                }
            },
        ],
        [
            'AGNC',
            entry => {
                if (entry.value) {
                    eventDetail.AGNC = { value: entry.value };
                }
            },
        ],
        [
            'RELI',
            entry => {
                if (entry.value) {
                    eventDetail.RELI = { value: entry.value };
                }
            },
        ],
        [
            'CAUS',
            entry => {
                if (entry.value) {
                    eventDetail.CAUS = { value: entry.value };
                }
            },
        ],
        [
            'RESN',
            entry => {
                if (entry.value) {
                    eventDetail.RESN = { value: entry.value };
                }
            },
        ],
        [
            'SDATE',
            entry => {
                if (entry.value) {
                    const sdate: SDATEForEventDetail = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'TIME',
                            entry => {
                                if (entry.value) {
                                    sdate.TIME = { value: entry.value };
                                }
                            },
                        ],
                        [
                            'PHRASE',
                            entry => {
                                if (entry.value) {
                                    sdate.PHRASE = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    eventDetail.SDATE = sdate;
                }
            },
        ],
        // TODO ASSOCIATION_STRUCTURE
        [
            'NOTE',
            entry => {
                const noteStructure = toNOTENoteStructure(entry);
                if (noteStructure) {
                    eventDetail.NOTE_STRUCTURE ??= [];
                    eventDetail.NOTE_STRUCTURE.push({ value: noteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteStructure = toSNOTENoteStructure(entry);
                if (snoteStructure) {
                    eventDetail.NOTE_STRUCTURE ??= [];
                    eventDetail.NOTE_STRUCTURE.push({ value: snoteStructure });
                }
            },
        ],
        [
            'SOUR',
            entry => {
                const sourceCitation = toSourceCitation(entry);
                if (sourceCitation) {
                    eventDetail.SOURCE_CITATION ??= [];
                    eventDetail.SOURCE_CITATION.push({ value: sourceCitation });
                }
            },
        ],
        // TODO MULTIMEDIA_LINK
        [
            'UID',
            entry => {
                if (entry.value) {
                    eventDetail.UID ??= [];
                    eventDetail.UID.push({ value: entry.value });
                }
            },
        ],
    ]);

    handleEntries(entries, handlers);
    return eventDetail;
};
