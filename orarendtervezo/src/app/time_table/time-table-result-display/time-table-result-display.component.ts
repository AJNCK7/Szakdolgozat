import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table-result-display',
  templateUrl: './time-table-result-display.component.html',
  styleUrls: ['./time-table-result-display.component.css']
})
export class TimeTableResultDisplayComponent implements OnInit {

  days: string[] = ['DAYS_SHORT_FORM.MONDAY', 'DAYS_SHORT_FORM.TUESDAY', 'DAYS_SHORT_FORM.WEDNESDAY', 
                    'DAYS_SHORT_FORM.THURSDAY', 'DAYS_SHORT_FORM.FRIDAY', 'DAYS_SHORT_FORM.SATURDAY', 'DAYS_SHORT_FORM.SUNDAY'];
  hours: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  constructor() { }

  ngOnInit(): void {
  }

}
