import { Record } from '@type/record/record';
import { RecordId } from '@type/record/record-id';
import { Tag } from '@type/tag/tag';

export const ifAlreadyExistsPolicies = {
    OVERWRITE: 'OVERWRITE',
    IGNORE: 'IGNORE',
} as const;

export type ifAlreadyExistsPolicy = keyof typeof ifAlreadyExistsPolicies;

export class TaggableRecordsMapper {
    private recordsByIdByTag = new Map<Tag, Map<RecordId, Record>>();

    constructor(private ifAlreadyExistsPolicy: ifAlreadyExistsPolicy) {}

    public add(record: Record) {
        const recordsById = this.recordsByIdByTag.get(record.tag) || new Map<RecordId, Record>();
        const isAlreadyExists = recordsById.has(record.id);
        if (isAlreadyExists && this.ifAlreadyExistsPolicy === ifAlreadyExistsPolicies.IGNORE) {
            return;
        }
        recordsById.set(record.id, record);
        this.recordsByIdByTag.set(record.tag, recordsById);
    }

    public get(tag: Tag, id: RecordId): Record | undefined {
        const recordsById = this.recordsByIdByTag.get(tag);
        if (!recordsById) {
            return undefined;
        }
        return recordsById.get(id);
    }

    public getRecords(): Record[][] {
        return Array.from(this.recordsByIdByTag.values()).map(recordsById => Array.from(recordsById.values()));
    }
}
