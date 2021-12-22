import { EditComponent } from './../../shared/dialog/time-table-datatable/edit/edit.component';
import { AddComponent } from './../../shared/dialog/time-table-datatable/add/add.component';
import { DeleteComponent } from './../../shared/dialog/time-table-datatable/delete/delete.component';
import { Component, OnInit } from '@angular/core';
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
export class TimeTableInputComponent implements OnInit{

  ID = 1;
  index = 0;

  form: FormGroup = new FormGroup({});

  displayedColumns: string[] = ['id', 'subjectName', 'day', 'subjectWeight', 'classStartTime', 
  'classEndTime', 'sameSubject', 'classroom',  'teacher', 'credit', 'priority', 'color', 'buttons'];
  dataSource = new MatTableDataSource<TimeTableInputInterface>([]);

  constructor (
    public authService: AuthService,
    public matDialog: MatDialog,
    ) {
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
    this.dataSource.data = JSON.parse(localStorage.getItem('TimeTableDatas') || '{}');
    if (this.dataSource.data[this.dataSource.data.length - 1].ID != 1) {
      this.ID = this.dataSource.data[this.dataSource.data.length-1].ID + 1;
    }
  }
  
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
      localStorage.setItem('TimeTableDatas', JSON.stringify(this.dataSource.data));
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
          localStorage.setItem('TimeTableDatas', JSON.stringify(this.dataSource.data));
        }
      });
    }

  openDeleteDialog(index: number) {
    this.matDialog.open(DeleteComponent)
    .afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = this.dataSource.data;
        localStorage.setItem('TimeTableDatas', JSON.stringify(this.dataSource.data));
      }
    });
  }

  openDeleteAllDialog() {
    this.matDialog.open(DeleteAllComponent).afterClosed().subscribe(result => {
      if (result == 1) {
        this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
        this.ID = 1;
        localStorage.setItem('TimeTableDatas', JSON.stringify(this.dataSource.data));
      }
    })
  }

  dayChanger(day: string){
    switch (day) {
      case "0":
        return 'DAYS_SHORT_FORM.MONDAY';
      case "1":
        return 'DAYS_SHORT_FORM.TUESDAY';
      case "2":
        return 'DAYS_SHORT_FORM.WEDNESDAY';
      case "3":
        return 'DAYS_SHORT_FORM.THURSDAY';
      case "4":
        return 'DAYS_SHORT_FORM.FRIDAY';
      case "5":
        return 'DAYS_SHORT_FORM.SATURDAY';
      case "6":
        return 'DAYS_SHORT_FORM.SUNDAY';
      default:
        return 'Error'
    }
  }

  subjectWeightChanger(subjectWeight: string){
    switch (subjectWeight) {
      case "0":
        return 'SUBJECT_WEIGHT_SHORT_FORM.MANDATORY';
      case "1":
        return 'SUBJECT_WEIGHT_SHORT_FORM.MANDATORY_OPTIONAL';
      case "2":
        return 'SUBJECT_WEIGHT_SHORT_FORM.OPTIONAL';
      default:
        return 'Error'
      }
    }
}
