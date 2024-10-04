import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';
import { isRootTag, RootTag } from '@type/tag/root-tag';

export interface Root<I = string> extends IdentifiableHierarchicalAttribute<I, null /*, RootTag*/> {
    tag: RootTag;
}

export const isRoot = (value: unknown): value is Root => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'value' in value &&
        value.value === null &&
        'tag' in value &&
        typeof value.tag === 'string' &&
        isRootTag(value.tag)
    );
};
