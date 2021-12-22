import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startTimeIsGreaterThanEndTime } from 'src/app/shared/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TimeTableInputInterface } from 'src/app/time_table/time-table-input/time-table-input.component';

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
        Validators.pattern('([1]?[0-9]|2[0-3]):[0-5][0-9]')
      ]],
      classEndTime: ['', [
        Validators.required,
        Validators.pattern('([1]?[0-9]|2[0-3]):[0-5][0-9]')
      ]],
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
    }, {
      validator: [
        startTimeIsGreaterThanEndTime('classStartTime', 'classEndTime'), 
      ]
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
