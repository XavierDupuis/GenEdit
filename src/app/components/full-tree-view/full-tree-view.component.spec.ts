import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTreeViewComponent } from './full-tree-view.component';

describe('FullTreeViewComponent', () => {
    let component: FullTreeViewComponent;
    let fixture: ComponentFixture<FullTreeViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FullTreeViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FullTreeViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
