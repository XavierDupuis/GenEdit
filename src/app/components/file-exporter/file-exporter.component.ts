import { Component, inject } from '@angular/core';
import { TreeState } from '@app/states/tree.state';
import { Store } from '@ngxs/store';
import { encoder } from '../../../encoder/encoder';

@Component({
    selector: 'app-file-exporter',
    standalone: true,
    imports: [],
    templateUrl: './file-exporter.component.html',
    styleUrl: './file-exporter.component.scss',
})
export class FileExporterComponent {
    private store = inject(Store);
    private roots = () => this.store.selectSnapshot(TreeState.getRoots);
    private filename = () => this.store.selectSnapshot(TreeState.getFilename);

    protected exportFile(): void {
        const roots = this.roots();
        const lines = encoder(roots);
        const fileContent = lines.join('\n');
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.filename() ?? 'Tree.ged';
        a.click();
    }
}
