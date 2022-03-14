import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableInputComponent } from './time-table-input.component';

describe('TimeTableInputComponent', () => {
    let component: TimeTableInputComponent;
    let fixture: ComponentFixture<TimeTableInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TimeTableInputComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeTableInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
