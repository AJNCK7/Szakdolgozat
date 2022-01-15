import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableResultDisplayComponent } from './time-table-result-display.component';

describe('TimeTableResultDisplayComponent', () => {
  let component: TimeTableResultDisplayComponent;
  let fixture: ComponentFixture<TimeTableResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableResultDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
