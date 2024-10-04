import { ExtAttributeTag, isExtAttributeTag } from '@type/tag/ext-attribute-tag';
import { StdAttributeTag, isStdAttributeTag } from '@type/tag/std-attribute-tag';

export type AttributeTag = StdAttributeTag | ExtAttributeTag;

export const isAttributeTag = (value: unknown): value is AttributeTag =>
    typeof value === 'string' && (isStdAttributeTag(value) || isExtAttributeTag(value));
