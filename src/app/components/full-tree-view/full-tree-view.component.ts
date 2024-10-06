import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { isCrossReferencePointer as stdIsCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { Reference } from '@type/level-5/reference';
import { getFriendlyTag as stdGetFriendlyTag } from '../../../resources/friendly-tag';
import { TreeState } from '@app/states/tree.state';
import { Store } from '@ngxs/store';
import { RootTag } from '@type/tag/root-tag';
import { map, OperatorFunction } from 'rxjs';
import { Root } from '@type/level-4/root';

const EXTERNAL_REFERENCE_START = 'http';

@Component({
    selector: 'app-full-tree-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './full-tree-view.component.html',
    styleUrl: './full-tree-view.component.scss',
})
export class FullTreeViewComponent {
    protected isReferencePopupVisible = signal(false);
    protected popupPosition = signal<{ x: number; y: number } | null>(null);
    protected references = signal<Reference[]>([]);

    protected isCrossReferencePointer = stdIsCrossReferencePointer;
    protected getFriendlyTag = stdGetFriendlyTag;

    private store = inject(Store);

    private rootsToArray = (roots: Map<RootTag, Map<string, Root>>): Root[][] => {
        return Array.from(roots.values()).map(root => Array.from(root.values()));
    };

    protected roots$ = this.store.select(TreeState.getRoots).pipe(map(this.rootsToArray));

    protected isExternalReference(value?: string) {
        return value?.startsWith(EXTERNAL_REFERENCE_START);
    }

    protected showReferences(event: MouseEvent, crossReference: string | null): void {
        if (!crossReference) {
            return;
        }
        const references = this.getReferences(crossReference);
        this.references.set(references);
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.bottom + window.scrollY;
        this.popupPosition.set({ x, y });
        this.isReferencePopupVisible.set(true);
    }

    protected hideReferences() {
        this.isReferencePopupVisible.set(false);
        this.popupPosition.set(null);
        this.references.set([]);
    }

    private getReferences(value?: string): Reference[] {
        if (!value) {
            return [];
        }
        if (!this.isCrossReferencePointer(value)) {
            return [];
        }
        return this.store.selectSnapshot(TreeState.getReferences).get(value) || [];
    }
}
