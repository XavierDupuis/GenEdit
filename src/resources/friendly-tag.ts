import { isStdTag, StdTag } from '@type/tag/std-tag';

const FriendlyStdTags: { [key in StdTag]: string } = {
    ABBR: 'Abbreviation',
    ADDR: 'Address',
    ADOP: 'Adoption',
    ADR1: 'Address Line 1',
    ADR2: 'Address Line 2',
    ADR3: 'Address Line 3',
    AGE: 'Age at event',
    AGNC: 'Responsible agency',
    ALIA: 'Alias',
    ANCI: 'Ancestor interest',
    ANUL: 'Annulment',
    ASSO: 'Associates',
    AUTH: 'Author',
    BAPL: 'Baptism (Latter-Day Saint)',
    BAPM: 'Baptism',
    BARM: 'Bar Mitzvah',
    BASM: 'Bas Mitzvah',
    BIRT: 'Birth',
    BLES: 'Blessing',
    BURI: 'Depositing remains',
    CALN: 'Call number',
    CAST: 'Caste',
    CAUS: 'Cause',
    CENS: 'Census',
    CHAN: 'Change',
    CHIL: 'Child',
    CHRA: 'Adult Christening',
    CHR: 'Christening',
    CITY: 'City',
    CONF: 'Confirmation',
    CONL: 'Confirmation (Latter-Day Saint)',
    CONT: 'Continued',
    COPR: 'Copyright',
    CORP: 'Corporate',
    CREA: 'Creation',
    CREM: 'Cremation',
    CROP: 'Crop',
    CTRY: 'Country',
    DATA: 'Data',
    DATE: 'Date',
    DEAT: 'Death',
    DESI: 'Descendant interest',
    DEST: 'Destination',
    DIVF: 'Divorce filing',
    DIV: 'Divorce',
    DSCR: 'Description',
    EDUC: 'Education',
    EMAIL: 'Email',
    EMIG: 'Emigration',
    ENDL: 'Endowment (Latter-Day Saint)',
    ENGA: 'Engagement',
    EVEN: 'Event',
    EXID: 'External Identifier',
    FAM: 'Family',
    FACT: 'Fact',
    FAMC: 'Family child',
    FAMS: 'Family spouse',
    FAX: 'Facsimile',
    FCOM: 'First communion',
    FILE: 'File reference',
    FORM: 'Format',
    GEDC: 'GEDCOM',
    GIVN: 'Given name',
    GRAD: 'Graduation',
    HEAD: 'Header',
    HEIGHT: 'Height in pixels',
    HUSB: 'Husband',
    IDNO: 'Identification number',
    IMMI: 'Immigration',
    INDI: 'Individual',
    INIL: 'Initiatory (Latter-Day Saint)',
    LANG: 'Language',
    LATI: 'Latitude',
    LONG: 'Longitude',
    MAP: 'Map',
    MARB: 'Marriage banns',
    MARC: 'Marriage contract',
    MARL: 'Marriage license',
    MARR: 'Marriage',
    MARS: 'Marrige settlement',
    MEDI: 'Medium',
    MIME: 'Media type',
    NAME: 'Name',
    NATI: 'Nationality',
    NATU: 'Naturalization',
    NCHI: 'Number of children',
    NICK: 'Nickname',
    NMR: 'Number of marriages',
    NO: 'Did not happen',
    NOTE: 'Note',
    NPFX: 'Name prefix',
    NSFX: 'Name suffix',
    OBJE: 'Object',
    OCCU: 'Occupation',
    ORDN: 'Ordination',
    PAGE: 'Page',
    PEDI: 'Pedigree',
    PHON: 'Phone',
    PHRASE: 'Phrase',
    PLAC: 'Place',
    POST: 'Postal code',
    PROB: 'Probate',
    PROP: 'Property',
    PUBL: 'Publication',
    QUAY: 'Quality of data',
    REFN: 'Reference',
    RELI: 'Religion',
    RESN: 'Restriction',
    REPO: 'Repository',
    RESI: 'Residence',
    RETI: 'Retirement',
    ROLE: 'Role',
    SCHMA: 'Schema',
    SDATE: 'Sort date',
    SEX: 'Sex',
    SLGC: 'Sealing (child)',
    SLGS: 'Sealing (spouse)',
    SNOTE: 'Shared note',
    SOUR: 'Source',
    SPFX: 'Surname prefix',
    SSN: 'Social security number',
    STAE: 'State',
    STAT: 'Status',
    SUBM: 'Submitter',
    SURN: 'Surname',
    TAG: 'Extension tag',
    TEMP: 'Temple',
    TEXT: 'Text',
    TIME: 'Time',
    TITL: 'Title',
    TOP: 'Top crop width',
    TRAN: 'Translation',
    TRLR: 'Trailer',
    TYPE: 'Type',
    UID: 'Unique identifier',
    VERS: 'Version',
    WIDTH: 'Width in pixels',
    WIFE: 'Wife',
    WILL: 'Will',
    WWW: 'Web address',
} as const;

export type FriendlyStdTag = (typeof FriendlyStdTags)[keyof typeof FriendlyStdTags];

const FriendlyStdTagValues = Object.values(FriendlyStdTags);

export const isFriendlyStdTag = (value: string): value is FriendlyStdTag => FriendlyStdTagValues.includes(value);

export const getFriendlyTag = (tag: string): string => (isStdTag(tag) ? getFriendlyStdTag(tag) : tag);

const getFriendlyStdTag = (tag: StdTag): string => FriendlyStdTags[tag];
