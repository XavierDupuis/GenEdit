import { Entry } from '@type/parse/3-semantic/level-2/entry';

export class EntryStacker<E extends Entry = Entry> {
    private stack: E[] = [];

    public push(item: E, depth: number) {
        this.goto(depth);
        if (depth === 0) {
            this.stack.push(item);
            return;
        }
        if (!this.last) {
            console.log('No parent to push to for attribute', item, depth, this.stack.length);
            return;
        }

        item.parent = this.last ?? null;
        this.last.children.push(item);
        this.stack.push(item);
    }

    private goto(depth: number) {
        this.stack = this.stack.slice(0, depth);
    }

    public get last(): E | undefined {
        return this.stack.at(-1);
    }

    public get first(): E | undefined {
        return this.stack.at(0);
    }
}
