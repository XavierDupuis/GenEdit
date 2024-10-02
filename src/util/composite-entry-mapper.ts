import { CompositeEntry } from '@type/level-3/composite-entry';
import { Tag } from '@type/tag/tag';

export const ifAlreadyExistsPolicies = {
    OVERWRITE: 'OVERWRITE',
    IGNORE: 'IGNORE',
} as const;

export type ifAlreadyExistsPolicy = keyof typeof ifAlreadyExistsPolicies;

export class CompositeEntryMapper<T extends CompositeEntry = CompositeEntry> {
    private elementByIdByTag = new Map<Tag, Map<string, T>>();

    constructor(private ifAlreadyExistsPolicy: ifAlreadyExistsPolicy) {}

    public add(element: T): void {
        const elementById = this.elementByIdByTag.get(element.tag) || new Map<string, T>();
        const isAlreadyExists = elementById.has(element.id);
        if (isAlreadyExists && this.ifAlreadyExistsPolicy === ifAlreadyExistsPolicies.IGNORE) {
            return;
        }
        elementById.set(element.id, element);
        this.elementByIdByTag.set(element.tag, elementById);
    }

    public get(tag: Tag, id: string): T | undefined {
        const elementById = this.elementByIdByTag.get(tag);
        if (!elementById) {
            return undefined;
        }
        return elementById.get(id);
    }

    public toArray(): T[][] {
        return Array.from(this.elementByIdByTag.values()).map(elementById => Array.from(elementById.values()));
    }
}
