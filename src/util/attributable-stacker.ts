import { Attributable } from '@type/attribute/attributable';

export class AttributableStacker {
    private stack: Attributable[] = [];

    public push(attribute: Attributable, depth: number) {
        this.goto(depth);
        if (depth === 0) {
            this.stack.push(attribute);
            return;
        }
        if (!this.parent) {
            console.log('No parent to push to for attribute', attribute, depth, this.stack.length);
            return;
        }
        this.parent.attributes.push(attribute);
        this.stack.push(attribute);
    }

    private goto(depth: number) {
        this.stack = this.stack.slice(0, depth);
    }

    private get parent(): Attributable | undefined {
        return this.stack.at(-1);
    }
}
