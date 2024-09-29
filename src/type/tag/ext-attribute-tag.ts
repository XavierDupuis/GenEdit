export type ExtAttributeTag = `_${string}`;

export const isExtAttributeTag = (value: string): value is ExtAttributeTag =>
    value.startsWith('_') && value.slice(1) === value.slice(1).toUpperCase();
