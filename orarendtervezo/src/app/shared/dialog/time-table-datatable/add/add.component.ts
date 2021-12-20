import { Component, Inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  selector: 'app-add-tableDialogInputs',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  form: FormGroup = new FormGroup({});

  constructor (
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeTableInputInterface,
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
      subjectWeight: ['', [
        Validators.required,
      ]],
      classStartTime: ['', [
        Validators.required,
      ]],
      classEndTime: ['', [
        Validators.required,
      ]],
      sameSubject: ['', []],
      classroom: ['', [
        Validators.pattern('[A-Z][/][a-z0-9A-Z]+')
      ]],
      teacher: ['', [ ]],
      credit: ['', [ 
        Validators.pattern('[0-9]+'),
      ]],
      priority: ['', [
        Validators.pattern('[0-9]+'),
      ]],
      colorPick: ['', [ ]]
    })
  }

  get timeTableInputGet() {
    return this.form.controls;
  }

  submit() { }

  cancelClick() {
  this.dialogRef.close();
  }
}
