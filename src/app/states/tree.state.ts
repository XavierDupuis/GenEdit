import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Root } from '@type/level-4/root';
import { Reference } from '@type/level-5/reference';

interface TreeStateModel {
    roots: Root[][];
    references: Map<CrossReferencePointer, Reference[]>;
}

const TreeStateModelDefault: TreeStateModel = {
    roots: [],
    references: new Map(),
};

export class SetRoots {
    static readonly type = '[TreeState] SetRoots';
    constructor(public roots: Root[][]) {}
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
    public setRoots({ patchState }: StateContext<TreeStateModel>, { roots }: { roots: Root[][] }): void {
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
