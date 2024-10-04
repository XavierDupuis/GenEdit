import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import {
    isCrossReference,
    isCrossReferencePointer as stdIsCrossReferencePointer,
    toCrossReferencePointer as stdToCrossReferencePointer,
} from '@type/cross-reference/cross-reference';
import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';
import { Reference } from '@type/level-5/reference';
import { ReferenceMapper } from '@util/reference-mapper';
import { getFriendlyTag as stdGetFriendlyTag } from '../../../resources/friendly-tag';

const EXTERNAL_REFERENCE_START = 'http';

@Component({
    selector: 'app-full-tree-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './full-tree-view.component.html',
    styleUrl: './full-tree-view.component.scss',
})
export class FullTreeViewComponent {
    public hierarchicalListsList = input.required<IdentifiableHierarchicalAttribute[][]>();
    public referenceMapper = input<ReferenceMapper>();
    protected isReferencePopupVisible = signal(false);
    protected popupPosition = signal<{ x: number; y: number } | null>(null);
    protected references = signal<Reference[]>([]);

    protected isCrossReferencePointer = stdIsCrossReferencePointer;
    protected toCrossReferencePointer = stdToCrossReferencePointer;
    protected getFriendlyTag = stdGetFriendlyTag;

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
        if (!isCrossReference(value)) {
            return [];
        }
        const crossReferencePointer = this.toCrossReferencePointer(value);
        return this.referenceMapper()?.get(crossReferencePointer) || [];
    }
}
