import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parse } from '../parser/parser';
import { FileSelectorComponent } from '@app/components/file-selector/file-selector.component';
import { FullTreeViewComponent } from '@app/components/full-tree-view/full-tree-view.component';
import { ReferenceMapper } from '@util/reference-mapper';
import { CompositeRecord } from '@type/level-3/composite-entry';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileSelectorComponent, FullTreeViewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'GenEdit';

    protected compositeRecordListsList: CompositeRecord[][] = [];
    protected referenceMapper?: ReferenceMapper;

    protected fileContentChanged(fileContent: string) {
        const lines = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        const { compositeRecordMapper: entryMapper, referenceMapper } = parse(lines);
        this.compositeRecordListsList = entryMapper.toArray();
        this.referenceMapper = referenceMapper;
    }
}
