import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { isRecordId, isRecordIdReference, recordIdToReference } from '@type/level-1B/record-id';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { CompositeRecord } from '@type/level-3/composite-entry';
import { ReferenceMapper } from '@util/reference-mapper';

@Component({
    selector: 'app-full-tree-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './full-tree-view.component.html',
    styleUrl: './full-tree-view.component.scss',
})
export class FullTreeViewComponent {
    public compositeRecordListsList = input.required<CompositeRecord[][]>();
    public referenceMapper = input<ReferenceMapper>();
    protected isReferencePopupVisible = signal(false);
    protected popupPosition = signal<{ x: number; y: number } | null>(null);
    protected references = signal<CompositeAttribute[]>([]);

    protected isRecordReference(value?: string) {
        return isRecordIdReference(value);
    }

    protected isExternalReference(value?: string) {
        return value?.startsWith('http');
    }

    protected showReferences(event: MouseEvent, value?: string): void {
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

    private getReferences(value?: string): CompositeAttribute[] {
        if (!value) {
            return [];
        }
        if (!isRecordId(value)) {
            return [];
        }
        const recordIdReference = recordIdToReference(value);
        return this.referenceMapper()?.get(recordIdReference) || [];
    }
}
