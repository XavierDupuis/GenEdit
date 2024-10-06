import { inject, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { parse } from '../../parser/parser';
import { Root } from '@type/level-4/root';
import { SetReferences, SetRoots } from '@app/states/tree.state';
import { Store } from '@ngxs/store';
import { Reference } from '@type/level-5/reference';
import { CrossReferencePointer } from '@type/cross-reference/cross-reference';
import { RootTag } from '@type/tag/root-tag';

@Injectable({
    providedIn: 'root',
})
export class ImporterService {
    private store = inject(Store);
    private setRoots = (roots: Map<RootTag, Map<string, Root>>) => this.store.dispatch(new SetRoots(roots));
    private setReferences = (references: Map<CrossReferencePointer, Reference[]>) => this.store.dispatch(new SetReferences(references));

    public importFile(file: File): Observable<Event> {
        const reader = new FileReader();
        reader.onload = this.onFileLoaded;
        reader.readAsText(file);
        return fromEvent(reader, 'loadend');
    }

    private onFileLoaded = (event: ProgressEvent<FileReader>): void => {
        if (!event.target?.result) {
            return;
        }
        if (typeof event.target.result !== 'string') {
            return;
        }
        this.processFile(event.target.result);
    };

    private processFile(fileContent: string): void {
        const lines = this.getLinesFromFileContent(fileContent);
        const { rootMapper, referenceMapper } = parse(lines);
        this.setRoots(rootMapper.getMap());
        this.setReferences(referenceMapper.getMap());
    }

    private getLinesFromFileContent(fileContent: string) {
        const lines = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        return lines;
    }
}
