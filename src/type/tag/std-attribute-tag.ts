import { RecordTags } from '@type/tag/record-tag';

// https://gedcom.io/specifications/FamilySearchGEDCOMv7.html#structure-types
export const StdAttributeTags = {
    ABBR: 'ABBR',
    ADDR: 'ADDR',
    ADOP: 'ADOP',
    ADR1: 'ADR1',
    ADR2: 'ADR2',
    ADR3: 'ADR3',
    AGE: 'AGE',
    AGNC: 'AGNC',
    ALIA: 'ALIA',
    ANCI: 'ANCI',
    ANUL: 'ANUL',
    ASSO: 'ASSO',
    AUTH: 'AUTH',
    BAPL: 'BAPL',
    BAPM: 'BAPM',
    BARM: 'BARM',
    BASM: 'BASM',
    BIRT: 'BIRT',
    BLES: 'BLES',
    BURI: 'BURI',
    CALN: 'CALN',
    CAST: 'CAST',
    CAUS: 'CAUS',
    CENS: 'CENS',
    CHAN: 'CHAN',
    CHIL: 'CHIL',
    CHRA: 'CHRA',
    CHR: 'CHR',
    CITY: 'CITY',
    CONF: 'CONF',
    CONL: 'CONL',
    CONT: 'CONT',
    COPR: 'COPR',
    CORP: 'CORP',
    CREA: 'CREA',
    CREM: 'CREM',
    CROP: 'CROP',
    CTRY: 'CTRY',
    DATA: 'DATA',
    DATE: 'DATE',
    DEAT: 'DEAT',
    DESI: 'DESI',
    DEST: 'DEST',
    DIVF: 'DIVF',
    DIV: 'DIV',
    DSCR: 'DSCR',
    EDUC: 'EDUC',
    EMAIL: 'EMAIL',
    EMIG: 'EMIG',
    ENDL: 'ENDL',
    ENGA: 'ENGA',
    EVEN: 'EVEN',
    EXID: 'EXID',
    FACT: 'FACT',
    FAMC: 'FAMC',
    FAMS: 'FAMS',
    FAX: 'FAX',
    FCOM: 'FCOM',
    FILE: 'FILE',
    FORM: 'FORM',
    GEDC: 'GEDC',
    GIVN: 'GIVN',
    GRAD: 'GRAD',
    HEIGHT: 'HEIGHT',
    HUSB: 'HUSB',
    IDNO: 'IDNO',
    IMMI: 'IMMI',
    INIL: 'INIL',
    LANG: 'LANG',
    LATI: 'LATI',
    LONG: 'LONG',
    MAP: 'MAP',
    MARB: 'MARB',
    MARC: 'MARC',
    MARL: 'MARL',
    MARR: 'MARR',
    MARS: 'MARS',
    MEDI: 'MEDI',
    MIME: 'MIME',
    NAME: 'NAME',
    NATI: 'NATI',
    NATU: 'NATU',
    NCHI: 'NCHI',
    NICK: 'NICK',
    NMR: 'NMR',
    NO: 'NO',
    NOTE: 'NOTE',
    NPFX: 'NPFX',
    NSFX: 'NSFX',
    OCCU: 'OCCU',
    ORDN: 'ORDN',
    PAGE: 'PAGE',
    PEDI: 'PEDI',
    PHON: 'PHON',
    PHRASE: 'PHRASE',
    PLAC: 'PLAC',
    POST: 'POST',
    PROB: 'PROB',
    PROP: 'PROP',
    PUBL: 'PUBL',
    QUAY: 'QUAY',
    REFN: 'REFN',
    RELI: 'RELI',
    RESN: 'RESN',
    RESI: 'RESI',
    RETI: 'RETI',
    ROLE: 'ROLE',
    SCHMA: 'SCHMA',
    SDATE: 'SDATE',
    SEX: 'SEX',
    SLGC: 'SLGC',
    SLGS: 'SLGS',
    SPFX: 'SPFX',
    SSN: 'SSN',
    STAE: 'STAE',
    STAT: 'STAT',
    SURN: 'SURN',
    TAG: 'TAG',
    TEMP: 'TEMP',
    TEXT: 'TEXT',
    TIME: 'TIME',
    TITL: 'TITL',
    TOP: 'TOP',
    TRAN: 'TRAN',
    TYPE: 'TYPE',
    UID: 'UID',
    VERS: 'VERS',
    WIDTH: 'WIDTH',
    WIFE: 'WIFE',
    WILL: 'WILL',
    WWW: 'WWW',
    ...RecordTags,
} as const;

export type StdAttributeTag = (typeof StdAttributeTags)[keyof typeof StdAttributeTags];

const StdAttributeTagValues: string[] = Object.values(StdAttributeTags);

export const isStdAttributeTag = (value: string): value is StdAttributeTag => StdAttributeTagValues.includes(value);
