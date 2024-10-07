import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Root } from '@type/parse/3-semantic/level-2/root';
import { DatasetTag, isDatasetTag } from '@type/tag/dataset-tag';
import { RootTag } from '@type/tag/root-tag';

export const ifAlreadyExistsPolicies = {
    OVERWRITE: 'OVERWRITE',
    IGNORE: 'IGNORE',
} as const;

export type ifAlreadyExistsPolicy = keyof typeof ifAlreadyExistsPolicies;

export type RootMap<X extends CrossReferencePointer | null = CrossReferencePointer | null, R extends Root<X> = Root<X>> = Map<
    RootTag,
    Map<X | DatasetTag, R>
>;

export class RootMapper<X extends CrossReferencePointer | null = CrossReferencePointer | null, R extends Root<X> = Root<X>> {
    private elementByRefByTag: RootMap<X, R> = new Map<RootTag, Map<X | DatasetTag, R>>();

    constructor(private ifAlreadyExistsPolicy: ifAlreadyExistsPolicy) {}

    public add(root: R): void {
        const elementByRef = this.elementByRefByTag.get(root.tag) || new Map<X | DatasetTag, R>();
        const isAlreadyExists = elementByRef.has(root.xref);
        if (isAlreadyExists && this.ifAlreadyExistsPolicy === ifAlreadyExistsPolicies.IGNORE) {
            return;
        }
        if (root.xref === null) {
            if (isDatasetTag(root.tag)) {
                // Special case for dataset results
                elementByRef.set(root.tag, root);
            }
        } else {
            elementByRef.set(root.xref, root);
        }
        this.elementByRefByTag.set(root.tag, elementByRef);
    }

    public get(tag: RootTag, crossReferencePointer: X): R | undefined {
        const elementByRef = this.elementByRefByTag.get(tag);
        if (!elementByRef) {
            return undefined;
        }
        return elementByRef.get(crossReferencePointer);
    }

    public toArray(): R[][] {
        return Array.from(this.elementByRefByTag.values()).map(elementByRef => Array.from(elementByRef.values()));
    }

    public getMap(): RootMap<X, R> {
        return this.elementByRefByTag;
    }
}
