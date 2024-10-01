import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Rootable } from '@type/root/rootable';

@Component({
    selector: 'app-full-tree-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './full-tree-view.component.html',
    styleUrl: './full-tree-view.component.scss',
})
export class FullTreeViewComponent {
    public rootableListsList = input.required<Rootable[][]>();
}
