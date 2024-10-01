import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
    selector: 'app-file-selector',
    standalone: true,
    imports: [],
    templateUrl: './file-selector.component.html',
    styleUrl: './file-selector.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectorComponent {
    protected selectedFile: File | null = null;
    protected isProcessing = signal(false);
    public fileContentChanged = output<string>();

    protected onFileSelected(event: any /* TODO */): void {
        this.isProcessing.set(true);
        const file = event.target.files[0];
        this.selectedFile = file;

        if (file) {
            const reader = new FileReader();
            reader.onload = this.onFileLoaded;
            reader.readAsText(file); // Reading the file as text
        }
    }

    private onFileLoaded = (e: any /* TODO */): void => {
        this.fileContentChanged.emit(e.target.result);
        this.isProcessing.set(false);
    };
}
