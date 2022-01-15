import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeTableInputComponent } from 'src/app/time_table/time-table-input/time-table-input.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.css']
})
export class DeleteAllComponent{

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeTableInputComponent,
  ) {}

  noClick(): void {
    this.dialogRef.close();
  }

}
