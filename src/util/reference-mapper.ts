import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Reference } from '@type/level-5/reference';

export class ReferenceMapper<R extends Reference = Reference> {
    private attributesByCrossReferencePointer = new Map<CrossReferencePointer, R[]>();

    public tryAdd(referenceAttribute: R): void {
        if (!referenceAttribute.value) {
            return;
        }
        const crossReferencePointer = referenceAttribute.value;
        const attributes = this.attributesByCrossReferencePointer.get(crossReferencePointer) || [];
        attributes.push(referenceAttribute);
        this.attributesByCrossReferencePointer.set(crossReferencePointer, attributes);
    }

    public get(crossReferencePointer: CrossReferencePointer): Reference[] | undefined {
        return this.attributesByCrossReferencePointer.get(crossReferencePointer);
    }
}
