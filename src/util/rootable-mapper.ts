import { Rootable } from '@type/root/rootable';
import { Tag } from '@type/tag/tag';

export const ifAlreadyExistsPolicies = {
    OVERWRITE: 'OVERWRITE',
    IGNORE: 'IGNORE',
} as const;

export type ifAlreadyExistsPolicy = keyof typeof ifAlreadyExistsPolicies;

export class RootableMapper {
    private rootableByIdByTag = new Map<Tag, Map<string, Rootable>>();

    constructor(private ifAlreadyExistsPolicy: ifAlreadyExistsPolicy) {}

    public add(rootable: Rootable) {
        const RootableById = this.rootableByIdByTag.get(rootable.tag) || new Map<string, Rootable>();
        const isAlreadyExists = RootableById.has(rootable.id);
        if (isAlreadyExists && this.ifAlreadyExistsPolicy === ifAlreadyExistsPolicies.IGNORE) {
            return;
        }
        RootableById.set(rootable.id, rootable);
        this.rootableByIdByTag.set(rootable.tag, RootableById);
    }

    public get(tag: Tag, id: string): Rootable | undefined {
        const RootableById = this.rootableByIdByTag.get(tag);
        if (!RootableById) {
            return undefined;
        }
        return RootableById.get(id);
    }

    public toArray(): Rootable[][] {
        return Array.from(this.rootableByIdByTag.values()).map(RootableById => Array.from(RootableById.values()));
    }
}
