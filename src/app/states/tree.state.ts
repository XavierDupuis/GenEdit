import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Taggable } from '@type/level-1/taggable';
import { Valuable } from '@type/level-1/valuable';
import { Root } from '@type/level-4/root';
import { Reference } from '@type/level-5/reference';
import { RootTag, RootTags } from '@type/tag/root-tag';
import { StdAttributeTags } from '@type/tag/std-attribute-tag';

interface TreeStateModel {
    roots: Map<RootTag, Map<string, Root>>;
    references: Map<CrossReferencePointer, Reference[]>;
}

const TreeStateModelDefault: TreeStateModel = {
    roots: new Map(),
    references: new Map(),
};

export class SetRoots {
    static readonly type = '[TreeState] SetRoots';
    constructor(public roots: Map<RootTag, Map<string, Root>>) {}
}

export class SetReferences {
    static readonly type = '[TreeState] SetReferences';
    constructor(public references: Map<CrossReferencePointer, Reference[]>) {}
}

@State<TreeStateModel>({
    name: 'tree',
    defaults: TreeStateModelDefault,
})
export class TreeState {
    @Action(SetRoots)
    public setRoots({ patchState }: StateContext<TreeStateModel>, { roots }: { roots: Map<RootTag, Map<string, Root>> }): void {
        patchState({ roots });
    }

    @Action(SetReferences)
    public setReferences(
        { patchState }: StateContext<TreeStateModel>,
        { references }: { references: Map<CrossReferencePointer, Reference[]> }
    ): void {
        patchState({ references });
    }

    @Selector()
    public static getRoots(state: TreeStateModel): TreeStateModel['roots'] {
        return state.roots;
    }

    @Selector()
    public static getReferences(state: TreeStateModel): TreeStateModel['references'] {
        return state.references;
    }
}
