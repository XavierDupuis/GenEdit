import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import {
    isCrossReference,
    isCrossReferencePointer as stdIsCrossReferencePointer,
    toCrossReferencePointer,
} from '@type/cross-reference/cross-reference';
import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';
import { ReferenceMapper } from '@util/reference-mapper';

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
    protected references = signal<IdentifiableHierarchicalAttribute[]>([]);

    protected isCrossReferencePointer(value?: string) {
        return stdIsCrossReferencePointer(value);
    }

    protected isExternalReference(value?: string) {
        return value?.startsWith(EXTERNAL_REFERENCE_START);
    }

    protected showReferences(event: MouseEvent, value: string | null): void {
        if (!value) {
            return;
        }
        const references = this.getReferences(value);
        if (references.length === 0) {
            return;
        }
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

    private getReferences(value?: string): IdentifiableHierarchicalAttribute[] {
        if (!value) {
            return [];
        }
        if (!isCrossReference(value)) {
            return [];
        }
        const crossReferencePointer = toCrossReferencePointer(value);
        return this.referenceMapper()?.get(crossReferencePointer) || [];
    }
}
