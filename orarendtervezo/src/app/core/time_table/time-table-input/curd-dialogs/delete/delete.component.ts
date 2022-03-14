import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeTableInputComponent } from 'src/app/core/time_table/time-table-input/time-table-input.component';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent{

    constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeTableInputComponent,
    ) {}

    noClick(): void {
        this.dialogRef.close();
    }
}
