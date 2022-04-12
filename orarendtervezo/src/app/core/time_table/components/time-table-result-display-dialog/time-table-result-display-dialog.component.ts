import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberToTextController } from 'src/app/shared/controllers/numberdata-to-text-changer.controller';

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
    public numberToTextController: NumberToTextController
    ) {
        this.daySortedData = data;
    }

    colorChange(color: string){
        if (color != null) {
        document.getElementById('color')!.style.backgroundColor = color;
        document.getElementById('color')!.innerText = color;
        }
        else document.getElementById('color')!.innerText = '-';    
    }

    getSubjectGroupText() {
        const subjectGroupNames: string[] = JSON.parse(localStorage.getItem('SameSubjectGroups') || '[]');
        return subjectGroupNames[this.daySortedData.element.SUBJECT_GROUP];
    }
}
