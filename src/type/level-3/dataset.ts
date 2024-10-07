import { Root } from '@type/level-2/root';
import { DatasetTag } from '@type/tag/dataset-tag';

export interface Dataset extends Root<null> {
    type: 'dataset';
    tag: DatasetTag;
}
