const ExtTagPrefix = '_';

export type ExtAttributeTag = `${typeof ExtTagPrefix}${string}`;

export const isExtAttributeTag = (value: string): value is ExtAttributeTag =>
    value.startsWith(ExtTagPrefix) && value.slice(1) === value.slice(1).toUpperCase();
