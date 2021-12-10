import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

export interface TimeTableInputInterface {
  ID: number;
  SUBJECT_NAME: string;
  DAY: string;
  SUBJECT_WEIGHT: string;
  SUBJECT_START_TIME: string;
  SUBJECT_END_TIME: string;
  SAME_SUBJECT: string;
  CLASSROOM: string;
  TEACHER: string;
  CREDIT: number;
  PRIORITY: number;
  COLOR: string;
}

const ELEMENT_DATA: TimeTableInputInterface[] = [
  {ID: 1, SUBJECT_NAME: 'Magprog', DAY: "Monday", SUBJECT_WEIGHT: 'Mandatoriy', SUBJECT_START_TIME: '10:40', 
  SUBJECT_END_TIME: '11:50', SAME_SUBJECT: 'Asd', CLASSROOM: 'C/111', TEACHER: 'Troll', CREDIT: 1, PRIORITY: 9, COLOR: 'Red'}
];


@Component({
  selector: 'app-time-table-input',
  templateUrl: './time-table-input.component.html',
  styleUrls: ['./time-table-input.component.css']
})
export class TimeTableInputComponent{

  form: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    public authService: AuthService
    ) {
    this.form = fb.group({
      subjectName: ['', [
        Validators.required,
      ]],
      day: ['', [
        Validators.required,
      ]],
      sameSubject: ['', [
        Validators.required,
      ]],
      classroom: ['', [
        Validators.pattern('[A-Z][/][a-z0-9A-Z]+')
      ]],
      teacher: ['', [

      ]],
      priority: ['', [
        Validators.pattern('[0-9]+'),
      ]]
    })
  }

  displayedColumns: string[] = ['id', 'subjectName', 'day', 'subjectWeight', 'classStartTime', 
                                'classEndTime', 'sameSubject', 'classroom',  'teacher', 'credit', 'priority', 'color'];
  dataSource = ELEMENT_DATA;

  get timeTableInputGet() {
    return this.form.controls;
  }

  submit() {}
}
