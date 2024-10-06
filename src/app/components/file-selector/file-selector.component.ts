import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ImporterService } from '@app/services/importer.service';
import { take, tap } from 'rxjs';

@Component({
    selector: 'app-file-selector',
    standalone: true,
    imports: [],
    templateUrl: './file-selector.component.html',
    styleUrl: './file-selector.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectorComponent {
    private destroyRef = inject(DestroyRef);
    private importerService = inject(ImporterService);

    protected isProcessing = signal(false);

    protected onFileSelected(event: Event): void {
        this.isProcessing.set(true);
        const file = this.getFileFromEvent(event);
        if (!file) {
            this.isProcessing.set(false);
            return;
        }

        this.importerService
            .importFile(file)
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.isProcessing.set(false));
    }

    private getFileFromEvent(event: Event): File | null {
        const hasTarget = 'target' in event && event.target !== null;
        if (!hasTarget) {
            return null;
        }
        const target = event.target;
        const hasFiles = 'files' in target && target.files !== null;
        if (!hasFiles) {
            return null;
        }
        const files = target.files;
        const hasFile = files instanceof FileList && files.length > 0;
        if (!hasFile) {
            return null;
        }
        const file = files[0];
        if (!(file instanceof File)) {
            return null;
        }
        return file;
    }
}
