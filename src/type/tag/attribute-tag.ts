import { ExtAttributeTag, isExtAttributeTag } from '@type/tag/ext-attribute-tag';
import { StdAttributeTag, isStdAttributeTag } from '@type/tag/std-attribute-tag';

export type AttributeTag = StdAttributeTag | ExtAttributeTag;

export const isAttributeTag = (value: string): value is AttributeTag => isStdAttributeTag(value) || isExtAttributeTag(value);
