import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableResultDisplayDialogComponent } from './time-table-result-display-dialog.component';

describe('TimeTableResultDisplayDialogComponent', () => {
    let component: TimeTableResultDisplayDialogComponent;
    let fixture: ComponentFixture<TimeTableResultDisplayDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TimeTableResultDisplayDialogComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeTableResultDisplayDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
