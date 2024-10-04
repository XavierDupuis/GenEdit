import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parse } from '../parser/parser';
import { FileSelectorComponent } from '@app/components/file-selector/file-selector.component';
import { FullTreeViewComponent } from '@app/components/full-tree-view/full-tree-view.component';
import { ReferenceMapper } from '@util/reference-mapper';
import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileSelectorComponent, FullTreeViewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'GenEdit';

    protected hierarchicalListsList: IdentifiableHierarchicalAttribute[][] = [];
    protected referenceMapper?: ReferenceMapper;

    protected fileContentChanged(fileContent: string) {
        const lines = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        const { rootMapper, referenceMapper } = parse(lines);
        this.hierarchicalListsList = rootMapper.toArray();
        this.referenceMapper = referenceMapper;
    }
}
