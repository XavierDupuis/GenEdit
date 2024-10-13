import { Entry } from '@type/parse/3-semantic/level-2/entry';
import { handleEntries, handleEntryChildren, StructureEntryHandlers } from '@type/structures/structure-entry-handlers';
import { EventDetail, toEventDetail } from '@type/structures/substructures/event-detail';

interface AGEForIndividualEventDetail {
    value: string;
    PHRASE?: {
        value: string;
    };
}

export interface IndividualEventDetail extends EventDetail {
    AGE?: AGEForIndividualEventDetail;
}

export const toIndividualEventDetail = (entries: Entry[]): IndividualEventDetail | null => {
    const individualEventDetail: IndividualEventDetail = { ...toEventDetail(entries) };

    const handlers: StructureEntryHandlers = new Map([
        [
            'AGE',
            entry => {
                if (entry.value) {
                    const age: AGEForIndividualEventDetail = { value: entry.value };
                    const handlers: StructureEntryHandlers = new Map([
                        [
                            'PHRASE',
                            (entry: Entry) => {
                                if (entry.value) {
                                    age.PHRASE = { value: entry.value };
                                }
                            },
                        ],
                    ]);
                    handleEntryChildren(entry, handlers);
                    individualEventDetail.AGE = { value: entry.value };
                }
            },
        ],
    ]);

    handleEntries(entries, handlers);
    return individualEventDetail;
};
