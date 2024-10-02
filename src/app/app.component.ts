import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parse } from '../parser/parser';
import { FileSelectorComponent } from '@app/components/file-selector/file-selector.component';
import { FullTreeViewComponent } from '@app/components/full-tree-view/full-tree-view.component';
import { ReferenceMapper } from '@util/reference-mapper';
import { CompositeEntry } from '@type/level-3/composite-entry';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileSelectorComponent, FullTreeViewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'GenEdit';

    protected compositeEntryListsList: CompositeEntry[][] = [];
    protected referenceMapper?: ReferenceMapper;

    protected fileContentChanged(fileContent: string) {
        const lines = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        const { compositeEntryMapper: entryMapper, referenceMapper } = parse(lines);
        this.compositeEntryListsList = entryMapper.toArray();
        this.referenceMapper = referenceMapper;
    }
}
