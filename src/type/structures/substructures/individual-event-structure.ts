import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Entry, isEntry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { IndividualEventDetail, toIndividualEventDetail } from '@type/structures/substructures/individual-event-detail';

interface FAMCForADOPIndividualEventStructure {
    xref: CrossReferencePointer;
    ADOP?: ADOPForFAMCForADOPIndividualEventStructure;
}

interface ADOPForFAMCForADOPIndividualEventStructure {
    value: string;
    PHRASE?: {
        value: string;
    };
}

type IndividualEventStructureBase = {
    value: string | null;
    TYPE?: {
        value: string;
    };
} & IndividualEventDetail;

export interface ADOPIndividualEventStructure {
    ADOP: IndividualEventStructureBase & {
        FAMC?: FAMCForADOPIndividualEventStructure;
    };
}

export interface BAPMIndividualEventStructure {
    BAPM: IndividualEventStructureBase;
}

export interface BARMIndividualEventStructure {
    BARM: IndividualEventStructureBase;
}

export interface BASMIndividualEventStructure {
    BASM: IndividualEventStructureBase;
}

export interface BIRTIndividualEventStructure {
    BIRT: IndividualEventStructureBase & {
        FAMC?: {
            xref: CrossReferencePointer;
        };
    };
}

export interface BLESIndividualEventStructure {
    BLES: IndividualEventStructureBase;
}

export interface BURIIndividualEventStructure {
    BURI: IndividualEventStructureBase;
}

export interface CENSIndividualEventStructure {
    CENS: IndividualEventStructureBase;
}

export interface CHRIndividualEventStructure {
    CHR: IndividualEventStructureBase & {
        FAMC?: {
            xref: CrossReferencePointer;
        };
    };
}

export interface CHRAIndividualEventStructure {
    CHRA: IndividualEventStructureBase;
}

export interface CONFIndividualEventStructure {
    CONF: IndividualEventStructureBase;
}

export interface CREMIndividualEventStructure {
    CREM: IndividualEventStructureBase;
}

export interface DEATIndividualEventStructure {
    DEAT: IndividualEventStructureBase;
}

export interface EMIGIndividualEventStructure {
    EMIG: IndividualEventStructureBase;
}

export interface FCOMIndividualEventStructure {
    FCOM: IndividualEventStructureBase;
}

export interface GRADIndividualEventStructure {
    GRAD: IndividualEventStructureBase;
}

export interface IMMIIndividualEventStructure {
    IMMI: IndividualEventStructureBase;
}

export interface NATUIndividualEventStructure {
    NATU: IndividualEventStructureBase;
}

export interface ORDNIndividualEventStructure {
    ORDN: IndividualEventStructureBase;
}

export interface PROBIndividualEventStructure {
    PROB: IndividualEventStructureBase;
}

export interface RETIIndividualEventStructure {
    RETI: IndividualEventStructureBase;
}

export interface WILLIndividualEventStructure {
    WILL: IndividualEventStructureBase;
}

export interface EVENIndividualEventStructure {
    EVEN: IndividualEventStructureBase;
}

export type IndividualEventStructure =
    | ADOPIndividualEventStructure
    | BAPMIndividualEventStructure
    | BARMIndividualEventStructure
    | BASMIndividualEventStructure
    | BIRTIndividualEventStructure
    | BLESIndividualEventStructure
    | BURIIndividualEventStructure
    | CENSIndividualEventStructure
    | CHRIndividualEventStructure
    | CHRAIndividualEventStructure
    | CONFIndividualEventStructure
    | CREMIndividualEventStructure
    | DEATIndividualEventStructure
    | EMIGIndividualEventStructure
    | FCOMIndividualEventStructure
    | GRADIndividualEventStructure
    | IMMIIndividualEventStructure
    | NATUIndividualEventStructure
    | ORDNIndividualEventStructure
    | PROBIndividualEventStructure
    | RETIIndividualEventStructure
    | WILLIndividualEventStructure
    | EVENIndividualEventStructure;

export const toADOPIndividualEventStructure = (entry: Entry): ADOPIndividualEventStructure | null => {
    const adopIndividualEventStructure: ADOPIndividualEventStructure = {
        ADOP: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    adopIndividualEventStructure.ADOP.TYPE = { value: entry.value };
                }
            },
        ],
        [
            'FAMC',
            entry => {
                if (entry.xref) {
                    const famc: FAMCForADOPIndividualEventStructure = { xref: entry.xref };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'ADOP',
                            entry => {
                                if (entry.value) {
                                    const adop: ADOPForFAMCForADOPIndividualEventStructure = { value: entry.value };
                                    const handlers: StructureEntryHandlers = new Map([
                                        [
                                            'PHRASE',
                                            entry => {
                                                if (entry.value) {
                                                    adop.PHRASE = { value: entry.value };
                                                }
                                            },
                                        ],
                                    ]);
                                    handleEntryChildren(entry, handlers);
                                    famc.ADOP = adop;
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    adopIndividualEventStructure.ADOP.FAMC = famc;
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return adopIndividualEventStructure;
};

export const toBAPMIndividualEventStructure = (entry: Entry): BAPMIndividualEventStructure | null => {
    const bapmIndividualEventStructure: BAPMIndividualEventStructure = {
        BAPM: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    bapmIndividualEventStructure.BAPM.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return bapmIndividualEventStructure;
};

export const toBARMIndividualEventStructure = (entry: Entry): BARMIndividualEventStructure | null => {
    const barmIndividualEventStructure: BARMIndividualEventStructure = {
        BARM: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    barmIndividualEventStructure.BARM.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return barmIndividualEventStructure;
};

export const toBASMIndividualEventStructure = (entry: Entry): BASMIndividualEventStructure | null => {
    const basmIndividualEventStructure: BASMIndividualEventStructure = {
        BASM: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    basmIndividualEventStructure.BASM.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return basmIndividualEventStructure;
};

export const toBIRTIndividualEventStructure = (entry: Entry): BIRTIndividualEventStructure | null => {
    const birtIndividualEventStructure: BIRTIndividualEventStructure = {
        BIRT: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    birtIndividualEventStructure.BIRT.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return birtIndividualEventStructure;
};

export const toBLESIndividualEventStructure = (entry: Entry): BLESIndividualEventStructure | null => {
    const blesIndividualEventStructure: BLESIndividualEventStructure = {
        BLES: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    blesIndividualEventStructure.BLES.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return blesIndividualEventStructure;
};

export const toBURIIndividualEventStructure = (entry: Entry): BURIIndividualEventStructure | null => {
    const buriIndividualEventStructure: BURIIndividualEventStructure = {
        BURI: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    buriIndividualEventStructure.BURI.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return buriIndividualEventStructure;
};

export const toCENSIndividualEventStructure = (entry: Entry): CENSIndividualEventStructure | null => {
    const censIndividualEventStructure: CENSIndividualEventStructure = {
        CENS: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    censIndividualEventStructure.CENS.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return censIndividualEventStructure;
};

export const toCHRIndividualEventStructure = (entry: Entry): CHRIndividualEventStructure | null => {
    const chrIndividualEventStructure: CHRIndividualEventStructure = {
        CHR: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    chrIndividualEventStructure.CHR.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return chrIndividualEventStructure;
};

export const toCHRAIndividualEventStructure = (entry: Entry): CHRAIndividualEventStructure | null => {
    const chraIndividualEventStructure: CHRAIndividualEventStructure = {
        CHRA: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    chraIndividualEventStructure.CHRA.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return chraIndividualEventStructure;
};

export const toCONFIndividualEventStructure = (entry: Entry): CONFIndividualEventStructure | null => {
    const confIndividualEventStructure: CONFIndividualEventStructure = {
        CONF: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    confIndividualEventStructure.CONF.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return confIndividualEventStructure;
};

export const toCREMIndividualEventStructure = (entry: Entry): CREMIndividualEventStructure | null => {
    const cremIndividualEventStructure: CREMIndividualEventStructure = {
        CREM: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    cremIndividualEventStructure.CREM.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return cremIndividualEventStructure;
};

export const toDEATIndividualEventStructure = (entry: Entry): DEATIndividualEventStructure | null => {
    const deatIndividualEventStructure: DEATIndividualEventStructure = {
        DEAT: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    deatIndividualEventStructure.DEAT.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return deatIndividualEventStructure;
};

export const toEMIGIndividualEventStructure = (entry: Entry): EMIGIndividualEventStructure | null => {
    const emigIndividualEventStructure: EMIGIndividualEventStructure = {
        EMIG: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    emigIndividualEventStructure.EMIG.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return emigIndividualEventStructure;
};

export const toFCOMIndividualEventStructure = (entry: Entry): FCOMIndividualEventStructure | null => {
    const fcomIndividualEventStructure: FCOMIndividualEventStructure = {
        FCOM: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    fcomIndividualEventStructure.FCOM.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return fcomIndividualEventStructure;
};

export const toGRADIndividualEventStructure = (entry: Entry): GRADIndividualEventStructure | null => {
    const gradIndividualEventStructure: GRADIndividualEventStructure = {
        GRAD: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    gradIndividualEventStructure.GRAD.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return gradIndividualEventStructure;
};

export const toIMMIIndividualEventStructure = (entry: Entry): IMMIIndividualEventStructure | null => {
    const immiIndividualEventStructure: IMMIIndividualEventStructure = {
        IMMI: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    immiIndividualEventStructure.IMMI.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return immiIndividualEventStructure;
};

export const toNATUIndividualEventStructure = (entry: Entry): NATUIndividualEventStructure | null => {
    const natuIndividualEventStructure: NATUIndividualEventStructure = {
        NATU: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    natuIndividualEventStructure.NATU.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return natuIndividualEventStructure;
};

export const toORDNIndividualEventStructure = (entry: Entry): ORDNIndividualEventStructure | null => {
    const ordnIndividualEventStructure: ORDNIndividualEventStructure = {
        ORDN: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    ordnIndividualEventStructure.ORDN.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return ordnIndividualEventStructure;
};

export const toPROBIndividualEventStructure = (entry: Entry): PROBIndividualEventStructure | null => {
    const probIndividualEventStructure: PROBIndividualEventStructure = {
        PROB: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    probIndividualEventStructure.PROB.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return probIndividualEventStructure;
};

export const toRETIIndividualEventStructure = (entry: Entry): RETIIndividualEventStructure | null => {
    const retiIndividualEventStructure: RETIIndividualEventStructure = {
        RETI: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    retiIndividualEventStructure.RETI.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return retiIndividualEventStructure;
};

export const toWILLIndividualEventStructure = (entry: Entry): WILLIndividualEventStructure | null => {
    const willIndividualEventStructure: WILLIndividualEventStructure = {
        WILL: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    willIndividualEventStructure.WILL.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return willIndividualEventStructure;
};

export const toEVENIndividualEventStructure = (entry: Entry): EVENIndividualEventStructure | null => {
    const evenIndividualEventStructure: EVENIndividualEventStructure = {
        EVEN: { value: entry.value, ...toIndividualEventDetail(entry.children.filter(isEntry)) },
    };
    const handlers: StructureEntryHandlers = new Map([
        [
            'TYPE',
            entry => {
                if (entry.value) {
                    evenIndividualEventStructure.EVEN.TYPE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntryChildren(entry, handlers);
    return evenIndividualEventStructure;
};
