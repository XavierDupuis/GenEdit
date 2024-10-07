import { Entry, isEntry } from '@type/parse/3-semantic/level-2/entry';
import { Root } from '@type/parse/3-semantic/level-2/root';
import { RootTag, RootTagOrder } from '@type/tag/root-tag';
import { RootMap } from '@util/root-mapper';

export const encoder = (roots: RootMap): string[] => {
    const orderedRoots = sortRoots(roots);
    const lines = [];
    for (const roots of orderedRoots) {
        for (const root of roots) {
            lines.push(...formatRoot(root));
        }
    }
    return lines;
};

const formatRoot = (root: Root): string[] => {
    const lines = [];
    lines.push(formatLine({ depth: 0, ...root }));
    for (const child of root.children) {
        if (isEntry(child)) {
            lines.push(...formatChild(child, 1));
        }
    }
    return lines;
};

const formatChild = (entry: Entry, depth: number): string[] => {
    const lines = [];
    lines.push(formatLine({ depth, ...entry }));
    for (const child of entry.children) {
        if (isEntry(child)) {
            lines.push(...formatChild(child, depth + 1));
        }
    }
    return lines;
};

const compareRootTags = (a: RootTag, b: RootTag): number => {
    return RootTagOrder[a] - RootTagOrder[b];
};

const sortRoots = (roots: RootMap): Root[][] => {
    return [...roots.entries()].sort(([a], [b]) => compareRootTags(a, b)).map(([, roots]) => [...roots.values()]);
};

const formatLine = ({ depth, tag, value, xref }: { depth: number; tag: string; value: string | null; xref: string | null }): string => {
    return `${depth} ${xref ? `${xref} ` : ''}${tag}${value ? ` ${value}` : ''}`;
};
