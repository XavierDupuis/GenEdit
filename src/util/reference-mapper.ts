import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';
import { ReferenceAttribute } from '@type/level-3/reference-attribute';

export class ReferenceMapper<
    RA extends ReferenceAttribute = ReferenceAttribute,
    IHA extends IdentifiableHierarchicalAttribute = IdentifiableHierarchicalAttribute,
> {
    private attributesByCrossReferencePointer = new Map<CrossReferencePointer, IHA[]>();

    public tryAdd(referenceAttribute: RA, ancestor: IHA | undefined): void {
        if (!ancestor) {
            return;
        }
        if (!referenceAttribute.value) {
            return;
        }
        const crossReferencePointer = referenceAttribute.value;
        const attributes = this.attributesByCrossReferencePointer.get(crossReferencePointer) || [];
        attributes.push(ancestor);
        this.attributesByCrossReferencePointer.set(crossReferencePointer, attributes);
    }

    public get(crossReferencePointer: CrossReferencePointer): IHA[] | undefined {
        return this.attributesByCrossReferencePointer.get(crossReferencePointer);
    }
}
