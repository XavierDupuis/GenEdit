import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileSelectorComponent } from '@app/components/file-selector/file-selector.component';
import { FullTreeViewComponent } from '@app/components/full-tree-view/full-tree-view.component';
import { FileExporterComponent } from '@app/components/file-exporter/file-exporter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileSelectorComponent, FileExporterComponent, FullTreeViewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'GenEdit';
}
