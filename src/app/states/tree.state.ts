import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Entry } from '@type/level-2/entry';
import { RootTags } from '@type/tag/root-tag';
import { StdAttributeTags } from '@type/tag/std-attribute-tag';
import { ReferenceMap } from '@util/reference-mapper';
import { RootMap } from '@util/root-mapper';

interface TreeStateModel {
    roots: RootMap;
    references: ReferenceMap;
}

const TreeStateModelDefault: TreeStateModel = {
    roots: new Map(),
    references: new Map(),
};

export class SetRoots {
    static readonly type = '[TreeState] SetRoots';
    constructor(public roots: RootMap) {}
}

export class SetReferences {
    static readonly type = '[TreeState] SetReferences';
    constructor(public references: ReferenceMap) {}
}

@State<TreeStateModel>({
    name: 'tree',
    defaults: TreeStateModelDefault,
})
export class TreeState {
    @Action(SetRoots)
    public setRoots({ patchState }: StateContext<TreeStateModel>, { roots }: { roots: RootMap }): void {
        patchState({ roots });
    }

    @Action(SetReferences)
    public setReferences({ patchState }: StateContext<TreeStateModel>, { references }: { references: ReferenceMap }): void {
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

    @Selector()
    public static getFilename(state: TreeStateModel): string | null {
        const attribute = state.roots
            .get(RootTags.HEAD)
            ?.get(RootTags.HEAD)
            ?.children.find(
                (child): child is Entry => typeof child === 'object' && child !== null && 'tag' in child && child.tag === StdAttributeTags.FILE
            );
        return attribute?.value ?? null;
    }
}
