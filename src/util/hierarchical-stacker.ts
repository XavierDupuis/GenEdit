import { Hierarchical } from '@type/level-2/hierarchical';

export class HierarchicalStacker<H extends Hierarchical /*<H>*/> {
    private stack: H[] = [];

    public push(item: H, depth: number) {
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

    public get last(): H | undefined {
        return this.stack.at(-1);
    }

    public get first(): H | undefined {
        return this.stack.at(0);
    }
}
