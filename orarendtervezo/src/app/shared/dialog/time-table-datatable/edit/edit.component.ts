import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
  form: FormGroup = new FormGroup({});

  constructor (
    public dialogRef: MatDialogRef<AddComponent>,
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

  get timeTableInputGet() {
    return this.form.controls;
  }

  submit() { }

  addClick() {}

  cancelClick() {
  this.dialogRef.close();
  }
}
