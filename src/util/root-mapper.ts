import { Root } from '@type/level-4/root';
import { RootTag } from '@type/tag/root-tag';

export const ifAlreadyExistsPolicies = {
    OVERWRITE: 'OVERWRITE',
    IGNORE: 'IGNORE',
} as const;

export type ifAlreadyExistsPolicy = keyof typeof ifAlreadyExistsPolicies;

export class RootMapper<I extends string = string, T extends Root<I> = Root<I>> {
    private elementByIdByTag = new Map<RootTag, Map<I, T>>();

    constructor(private ifAlreadyExistsPolicy: ifAlreadyExistsPolicy) {}

    public add(element: T): void {
        const elementById = this.elementByIdByTag.get(element.tag) || new Map<I, T>();
        const isAlreadyExists = elementById.has(element.id);
        if (isAlreadyExists && this.ifAlreadyExistsPolicy === ifAlreadyExistsPolicies.IGNORE) {
            return;
        }
        elementById.set(element.id, element);
        this.elementByIdByTag.set(element.tag, elementById);
    }

    public get(tag: RootTag, id: I): T | undefined {
        const elementById = this.elementByIdByTag.get(tag);
        if (!elementById) {
            return undefined;
        }
        return elementById.get(id);
    }

    public toArray(): T[][] {
        return Array.from(this.elementByIdByTag.values()).map(elementById => Array.from(elementById.values()));
    }

    public getMap(): Map<RootTag, Map<I, T>> {
        return this.elementByIdByTag;
    }
}
