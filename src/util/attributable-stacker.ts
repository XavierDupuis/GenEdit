import { Attributable } from '@type/level-1/attributable';

export class AttributableStacker<T extends Attributable = Attributable> {
    private stack: T[] = [];

    public push(attributable: T, depth: number) {
        this.goto(depth);
        if (depth === 0) {
            this.stack.push(attributable);
            return;
        }
        if (!this.last) {
            console.log('No parent to push to for attribute', attributable, depth, this.stack.length);
            return;
        }
        this.last.attributes.push(attributable);
        this.stack.push(attributable);
    }

    private goto(depth: number) {
        this.stack = this.stack.slice(0, depth);
    }

    public get last(): T | undefined {
        return this.stack.at(-1);
    }

    public get first(): T | undefined {
        return this.stack.at(0);
    }
}
