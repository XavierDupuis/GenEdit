import { RecordIdReference } from '@type/level-1B/record-id';
import { ReferenceAttribute } from '@type/level-1B/reference-attribute';
import { CompositeAttribute } from '@type/level-3/composite-attribute';

export class ReferenceMapper<RA extends ReferenceAttribute = ReferenceAttribute, CA extends CompositeAttribute = CompositeAttribute> {
    private referencesByRecordId = new Map<RecordIdReference, CA[]>();

    public tryAdd(referenceAttribute: RA, ancestorReferenceAttribute: CA | undefined): void {
        if (!ancestorReferenceAttribute) {
            return;
        }
        if (!referenceAttribute.value) {
            return;
        }
        const recordIdReference = referenceAttribute.value;
        const attributes = this.referencesByRecordId.get(recordIdReference) || [];
        attributes.push(ancestorReferenceAttribute);
        this.referencesByRecordId.set(recordIdReference, attributes);
    }

    public get(recordIdReference: RecordIdReference): CA[] | undefined {
        return this.referencesByRecordId.get(recordIdReference);
    }
}
