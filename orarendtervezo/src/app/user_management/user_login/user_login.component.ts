import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user_login.component.html',
  styleUrls: ['./user_login.component.css']
})
export class UserLoginComponent {
  hide = false;
  confirm_hide = false;
  
  form: FormGroup = new FormGroup({});

  constructor (private fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    })
  }

  get loginForm() {
    return this.form.controls;
  }

  submit() {

  }
}
