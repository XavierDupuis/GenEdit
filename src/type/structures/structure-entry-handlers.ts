import { Entry, isEntry } from '@type/parse/3-semantic/level-2/entry';
import { Tag } from '@type/tag/tag';

export type StructureEntryHandlers = Map<Tag, (entry: Entry) => void>;

export const handleEntryChildren = (entry: Entry, handlers: StructureEntryHandlers): void => {
    const entries = entry.children.filter(isEntry);
    handleEntries(entries, handlers);
};

export const handleEntries = (entries: Entry[], handlers: StructureEntryHandlers): void => {
    for (const entry of entries) {
        handleEntry(entry, handlers);
    }
};

export const handleEntry = (entry: Entry, handlers: StructureEntryHandlers): void => {
    const handler = handlers.get(entry.tag);
    if (handler) {
        handler(entry);
    } else {
        console.log(`Unhandled tag '${entry.tag}' on following entry :`, entry);
    }
};
