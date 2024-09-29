import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parse } from '../parser/parser';
import { TaggableRecordsMapper } from '@util/taggable-records-mapper';
import { Record } from '@type/record/record';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'GenEdit';

    private mapper: TaggableRecordsMapper;

    protected get recordListsList(): Record[][] {
        return this.mapper.getRecords();
    }

    constructor() {
        const lines = `TODO`;
        const linesArray = lines
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        this.mapper = parse(linesArray);
    }
}
