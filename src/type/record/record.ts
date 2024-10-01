import { RecordId } from '@type/record/record-id';
import { Rootable } from '@type/root/rootable';

export interface Record extends Rootable {
    id: RecordId;
}
