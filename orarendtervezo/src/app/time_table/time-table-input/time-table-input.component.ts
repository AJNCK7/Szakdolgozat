import { EditComponent } from './../../shared/dialog/time-table-datatable/edit/edit.component';
import { AddComponent } from './../../shared/dialog/time-table-datatable/add/add.component';
import { DeleteComponent } from './../../shared/dialog/time-table-datatable/delete/delete.component';
import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteAllComponent } from 'src/app/shared/dialog/time-table-datatable/delete-all/delete-all.component';

export interface TimeTableInputInterface {
  ID: number;
  SUBJECT_NAME: string;
  DAY: string;
  SUBJECT_WEIGHT: string;
  CLASS_START_TIME: string;
  CLASS_END_TIME: string;
  SAME_SUBJECT: string;
  CLASSROOM: string;
  TEACHER: string;
  CREDIT: number;
  PRIORITY: number;
  COLOR: string;
}
@Component({
  selector: 'app-time-table-input',
  templateUrl: './time-table-input.component.html',
  styleUrls: ['./time-table-input.component.css']
})
export class TimeTableInputComponent{

  ID = 1;
  index = 0;
  form: FormGroup = new FormGroup({});

  constructor (
    public authService: AuthService,
    public matDialog: MatDialog,
    ) {
  }

  displayedColumns: string[] = ['id', 'subjectName', 'day', 'subjectWeight', 'classStartTime', 
                                'classEndTime', 'sameSubject', 'classroom',  'teacher', 'credit', 'priority', 'color', 'buttons'];

  dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
  
  get timeTableInputGet() {
    return this.form.controls;
  }

  submit() {}

  openAddDialog() {
    this.matDialog.open(AddComponent, {data: {ID: this.ID}
    }).afterClosed().subscribe(result => {
      if(!!result){
      this.ID++;
      this.dataSource.data.push(result);
      this.dataSource.data = this.dataSource.data;
      }
    });
  }

  openEditDialog(index: number, id: number) {
      this.matDialog.open(EditComponent, {data: this.dataSource.data[index]
      }).afterClosed().subscribe(result =>{
        if (result != null) {
          this.dataSource.data[index] = result; 
          this.dataSource.data[index].ID = id;
          this.dataSource.data = this.dataSource.data;
        }
      });
    }

  openDeleteDialog(index: number) {
    this.matDialog.open(DeleteComponent)
    .afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  openDeleteAllDialog() {
    this.matDialog.open(DeleteAllComponent).afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
        this.ID = 1;
      }
    })
  }
}
