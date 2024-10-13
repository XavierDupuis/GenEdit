import { CrossReferencePointer, isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { PEDI } from '@type/enumsets/enumset-pedi';
import { Record } from '@type/parse/3-semantic/level-3/record';
import { StructureEntryHandlers, handleEntryChildren } from '@type/structures/structure-entry-handlers';
import { toAssociationStructure } from '@type/structures/substructures/association-structure';
import {
    IndividualEventStructure,
    toADOPIndividualEventStructure,
    toBAPMIndividualEventStructure,
    toBARMIndividualEventStructure,
    toBASMIndividualEventStructure,
    toBIRTIndividualEventStructure,
    toBLESIndividualEventStructure,
    toBURIIndividualEventStructure,
    toCENSIndividualEventStructure,
    toCHRAIndividualEventStructure,
    toCHRIndividualEventStructure,
    toCONFIndividualEventStructure,
    toCREMIndividualEventStructure,
    toDEATIndividualEventStructure,
    toEMIGIndividualEventStructure,
    toEVENIndividualEventStructure,
    toFCOMIndividualEventStructure,
    toGRADIndividualEventStructure,
    toIMMIIndividualEventStructure,
    toNATUIndividualEventStructure,
    toORDNIndividualEventStructure,
    toPROBIndividualEventStructure,
    toRETIIndividualEventStructure,
    toWILLIndividualEventStructure,
} from '@type/structures/substructures/individual-event-structure';
import { NoteStructure, toNOTENoteStructure, toSNOTENoteStructure } from '@type/structures/substructures/note-structure';
import { entryToPersonalName, PersonalNameStructure } from '@type/structures/substructures/personal-name-structure';
import { SourceCitation, toSourceCitation } from '@type/structures/substructures/source-citation';
import { TODO } from '@type/todo';

export interface IndividualRecord {
    INDI: {
        xref: CrossReferencePointer;
        RESN?: {
            value: string;
        };
        PERSONAL_NAME_STRUCTURE?: {
            value: PersonalNameStructure;
        }[];
        SEX?: {
            value: string;
        };
        INDIVIDUAL_ATTRIBUTE_STRUCTURE?: {
            value: IndividualEventStructure;
        }[];
        INDIVIDUAL_EVENT_STRUCTURE?: {
            value: IndividualEventStructure;
        }[];
        NON_EVENT_STRUCTURE?: {
            value: TODO;
        }[];
        LDS_INDIVIDUAL_ORDINANCE?: {
            value: TODO;
        }[];
        FAMC?: FAMCStructureForIndividualRecord[];
        FAMS?: FAMSStructureForIndividualRecord[];
        SUBM?: {
            xref: CrossReferencePointer;
        }[];
        ASSOCIATION_STRUCTURE?: {
            value: TODO;
        }[];
        ALIA?: ALIAStructureForIndividualRecord[];
        ANCI?: {
            xref: CrossReferencePointer;
        }[];
        DESI?: {
            xref: CrossReferencePointer;
        }[];
        IDENTIFIER_STRUCTURE?: {
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
        CHANGE_DATE?: {
            value: TODO;
        };
        CREATION_DATE?: {
            value: TODO;
        };
    };
}

interface FAMCStructureForIndividualRecord {
    xref: CrossReferencePointer;
    PEDI?: {
        value: PEDI;
        PHRASE?: {
            value: string;
        };
    };
    STAT?: {
        value: string;
        PHRASE?: {
            value: string;
        };
    };
    NOTE_STRUCTURE?: {
        value: NoteStructure;
    }[];
}

interface FAMSStructureForIndividualRecord {
    xref: CrossReferencePointer;
    NOTE_STRUCTURE?: {
        value: NoteStructure;
    }[];
}

interface ALIAStructureForIndividualRecord {
    xref: CrossReferencePointer;
    PHRASE?: {
        value: string;
    };
}

type IndividualRecordEntry = Record;

export const toIndividualRecord = (entry: IndividualRecordEntry): IndividualRecord => {
    const individualRecord: IndividualRecord = {
        INDI: {
            xref: entry.xref,
        },
    };

    const handlers: StructureEntryHandlers = new Map([
        [
            'RESN',
            entry => {
                if (entry.value) {
                    individualRecord.INDI.RESN = {
                        value: entry.value,
                    };
                }
            },
        ],
        [
            'NAME',
            entry => {
                const personalNameStructure = entryToPersonalName(entry);
                if (personalNameStructure) {
                    individualRecord.INDI.PERSONAL_NAME_STRUCTURE ??= [];
                    individualRecord.INDI.PERSONAL_NAME_STRUCTURE.push({ value: personalNameStructure });
                }
            },
        ],
        [
            'SEX',
            entry => {
                if (entry.value) {
                    individualRecord.INDI.SEX = { value: entry.value };
                }
            },
        ],
        // TODO : INDIVIDUAL_ATTRIBUTE_STRUCTURE
        [
            'ADOP',
            entry => {
                const ADOPIndividualEventStructure = toADOPIndividualEventStructure(entry);
                if (ADOPIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: ADOPIndividualEventStructure });
                }
            },
        ],
        [
            'BAPM',
            entry => {
                const BAPMIndividualEventStructure = toBAPMIndividualEventStructure(entry);
                if (BAPMIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BAPMIndividualEventStructure });
                }
            },
        ],
        [
            'BARM',
            entry => {
                const BARMIndividualEventStructure = toBARMIndividualEventStructure(entry);
                if (BARMIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BARMIndividualEventStructure });
                }
            },
        ],
        [
            'BASM',
            entry => {
                const BASMIndividualEventStructure = toBASMIndividualEventStructure(entry);
                if (BASMIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BASMIndividualEventStructure });
                }
            },
        ],
        [
            'BIRT',
            entry => {
                const BIRTIndividualEventStructure = toBIRTIndividualEventStructure(entry);
                console.log('BIRTH', BIRTIndividualEventStructure, entry);
                if (BIRTIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BIRTIndividualEventStructure });
                }
            },
        ],
        [
            'BLES',
            entry => {
                const BLESIndividualEventStructure = toBLESIndividualEventStructure(entry);
                if (BLESIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BLESIndividualEventStructure });
                }
            },
        ],
        [
            'BURI',
            entry => {
                const BURIIndividualEventStructure = toBURIIndividualEventStructure(entry);
                if (BURIIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: BURIIndividualEventStructure });
                }
            },
        ],
        [
            'CENS',
            entry => {
                const CENSIndividualEventStructure = toCENSIndividualEventStructure(entry);
                if (CENSIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: CENSIndividualEventStructure });
                }
            },
        ],
        [
            'CHR',
            entry => {
                const CHRIndividualEventStructure = toCHRIndividualEventStructure(entry);
                if (CHRIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: CHRIndividualEventStructure });
                }
            },
        ],
        [
            'CHRA',
            entry => {
                const CHRAIndividualEventStructure = toCHRAIndividualEventStructure(entry);
                if (CHRAIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: CHRAIndividualEventStructure });
                }
            },
        ],
        [
            'CONF',
            entry => {
                const CONFIndividualEventStructure = toCONFIndividualEventStructure(entry);
                if (CONFIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: CONFIndividualEventStructure });
                }
            },
        ],
        [
            'CREM',
            entry => {
                const CREMIndividualEventStructure = toCREMIndividualEventStructure(entry);
                if (CREMIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: CREMIndividualEventStructure });
                }
            },
        ],
        [
            'DEAT',
            entry => {
                const DEATIndividualEventStructure = toDEATIndividualEventStructure(entry);
                if (DEATIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: DEATIndividualEventStructure });
                }
            },
        ],
        [
            'EMIG',
            entry => {
                const EMIGIndividualEventStructure = toEMIGIndividualEventStructure(entry);
                if (EMIGIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: EMIGIndividualEventStructure });
                }
            },
        ],
        [
            'FCOM',
            entry => {
                const FCOMIndividualEventStructure = toFCOMIndividualEventStructure(entry);
                if (FCOMIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: FCOMIndividualEventStructure });
                }
            },
        ],
        [
            'GRAD',
            entry => {
                const GRADIndividualEventStructure = toGRADIndividualEventStructure(entry);
                if (GRADIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: GRADIndividualEventStructure });
                }
            },
        ],
        [
            'IMMI',
            entry => {
                const IMMIIndividualEventStructure = toIMMIIndividualEventStructure(entry);
                if (IMMIIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: IMMIIndividualEventStructure });
                }
            },
        ],
        [
            'NATU',
            entry => {
                const NATUIndividualEventStructure = toNATUIndividualEventStructure(entry);
                if (NATUIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: NATUIndividualEventStructure });
                }
            },
        ],
        [
            'ORDN',
            entry => {
                const ORDNIndividualEventStructure = toORDNIndividualEventStructure(entry);
                if (ORDNIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: ORDNIndividualEventStructure });
                }
            },
        ],
        [
            'PROB',
            entry => {
                const PROBIndividualEventStructure = toPROBIndividualEventStructure(entry);
                if (PROBIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: PROBIndividualEventStructure });
                }
            },
        ],
        [
            'RETI',
            entry => {
                const RETIIndividualEventStructure = toRETIIndividualEventStructure(entry);
                if (RETIIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: RETIIndividualEventStructure });
                }
            },
        ],
        [
            'WILL',
            entry => {
                const WILLIndividualEventStructure = toWILLIndividualEventStructure(entry);
                if (WILLIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: WILLIndividualEventStructure });
                }
            },
        ],
        [
            'EVEN',
            entry => {
                const EVENIndividualEventStructure = toEVENIndividualEventStructure(entry);
                if (EVENIndividualEventStructure) {
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE ??= [];
                    individualRecord.INDI.INDIVIDUAL_EVENT_STRUCTURE.push({ value: EVENIndividualEventStructure });
                }
            },
        ],
        // TODO : NON_EVENT_STRUCTURE
        // TODO : LDS_INDIVIDUAL_ORDINANCE
        [
            'FAMC',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.FAMC ??= [];
                    const famc: FAMCStructureForIndividualRecord = { xref: entry.value };

                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'PEDI',
                            () => {
                                if (entry.value) {
                                    famc.PEDI = {
                                        value: entry.value,
                                    };
                                }
                            },
                        ],
                        [
                            'STAT',
                            () => {
                                if (entry.value) {
                                    famc.STAT = {
                                        value: entry.value,
                                    };
                                }
                            },
                        ],
                        [
                            'NOTE',
                            () => {
                                const noteStructure = toNOTENoteStructure(entry);
                                if (noteStructure) {
                                    famc.NOTE_STRUCTURE ??= [];
                                    famc.NOTE_STRUCTURE.push({ value: noteStructure });
                                }
                            },
                        ],
                        [
                            'SNOTE',
                            () => {
                                const snoteStructure = toSNOTENoteStructure(entry);
                                if (snoteStructure) {
                                    famc.NOTE_STRUCTURE ??= [];
                                    famc.NOTE_STRUCTURE.push({ value: snoteStructure });
                                }
                            },
                        ],
                    ]);

                    handleEntryChildren(entry, handlers);
                    individualRecord.INDI.FAMC.push(famc);
                }
            },
        ],
        [
            'FAMS',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.FAMS ??= [];
                    const fams: FAMSStructureForIndividualRecord = { xref: entry.value };

                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'NOTE',
                            () => {
                                const noteStructure = toNOTENoteStructure(entry);
                                if (noteStructure) {
                                    fams.NOTE_STRUCTURE ??= [];
                                    fams.NOTE_STRUCTURE.push({ value: noteStructure });
                                }
                            },
                        ],
                        [
                            'SNOTE',
                            () => {
                                const snoteStructure = toSNOTENoteStructure(entry);
                                if (snoteStructure) {
                                    fams.NOTE_STRUCTURE ??= [];
                                    fams.NOTE_STRUCTURE.push({ value: snoteStructure });
                                }
                            },
                        ],
                    ]);

                    handleEntryChildren(entry, handlers);
                    individualRecord.INDI.FAMS.push(fams);
                }
            },
        ],
        [
            'SUBM',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.SUBM ??= [];
                    individualRecord.INDI.SUBM.push({ xref: entry.value });
                }
            },
        ],
        [
            'ASSO',
            entry => {
                const associationStructure = toAssociationStructure(entry);
                if (associationStructure) {
                    individualRecord.INDI.ASSOCIATION_STRUCTURE ??= [];
                    individualRecord.INDI.ASSOCIATION_STRUCTURE.push({ value: associationStructure });
                }
            },
        ],
        [
            'ALIA',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.ALIA ??= [];
                    const alia: ALIAStructureForIndividualRecord = { xref: entry.value };

                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'PHRASE',
                            entry => {
                                if (entry.value) {
                                    alia.PHRASE = {
                                        value: entry.value,
                                    };
                                }
                            },
                        ],
                    ]);

                    handleEntryChildren(entry, handlers);
                    individualRecord.INDI.ALIA.push(alia);
                }
            },
        ],
        [
            'ANCI',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.ANCI ??= [];
                    individualRecord.INDI.ANCI.push({ xref: entry.value });
                }
            },
        ],
        [
            'DESI',
            entry => {
                if (isCrossReferencePointer(entry.value)) {
                    individualRecord.INDI.DESI ??= [];
                    individualRecord.INDI.DESI.push({ xref: entry.value });
                }
            },
        ],
        // TODO : IDENTIFIER_STRUCTURE
        [
            'NOTE',
            entry => {
                const noteStructure = toNOTENoteStructure(entry);
                if (noteStructure) {
                    individualRecord.INDI.NOTE_STRUCTURE ??= [];
                    individualRecord.INDI.NOTE_STRUCTURE.push({ value: noteStructure });
                }
            },
        ],
        [
            'SNOTE',
            entry => {
                const snoteStructure = toSNOTENoteStructure(entry);
                if (snoteStructure) {
                    individualRecord.INDI.NOTE_STRUCTURE ??= [];
                    individualRecord.INDI.NOTE_STRUCTURE.push({ value: snoteStructure });
                }
            },
        ],
        [
            'SOUR',
            entry => {
                const sourceCitation = toSourceCitation(entry);
                if (sourceCitation) {
                    individualRecord.INDI.SOURCE_CITATION ??= [];
                    individualRecord.INDI.SOURCE_CITATION.push({ value: sourceCitation });
                }
            },
        ],
        // TODO : MULTIMEDIA_LINK
        // TODO : CHANGE_DATE
        // TODO : CREATION_DATE
    ]);

    handleEntryChildren(entry, handlers);
    return individualRecord;
};
