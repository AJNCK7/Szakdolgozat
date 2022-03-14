import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-time-table-result-display-dialog',
    templateUrl: './time-table-result-display-dialog.component.html',
    styleUrls: ['./time-table-result-display-dialog.component.css']
})
export class TimeTableResultDisplayDialogComponent{

    daySortedData;

    constructor(
    public dialogRef: MatDialogRef<TimeTableResultDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeTableResultDisplayDialogComponent,
    ) {
        this.daySortedData = data;
    }

    dayChanger(day: string){
        switch (day) {
        case '0': return 'DAYS.MONDAY';
        case '1': return 'DAYS.TUESDAY';
        case '2': return 'DAYS.WEDNESDAY';
        case '3': return 'DAYS.THURSDAY';
        case '4': return 'DAYS.FRIDAY';
        case '5': return 'DAYS.SATURDAY';
        default: return 'Error';
        }
    }

    subjectWeightChanger(subjectWeight: string){
        switch (subjectWeight) {
        case '2': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.MANDATORY';
        case '1': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.MANDATORY_OPTIONAL';
        case '0': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.OPTIONAL';
        default: return 'Error';
        }
    }

    colorChange(color: string){
        if (color != null) {
        document.getElementById('color')!.style.backgroundColor = color;
        document.getElementById('color')!.innerText = color;
        }
        else document.getElementById('color')!.innerText = '-';    
    }

}
