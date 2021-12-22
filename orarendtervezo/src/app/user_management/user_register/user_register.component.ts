import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/shared/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user_register',
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css']
})
export class UserRegisterComponent {
  hide = false;
  confirm_hide = false;
  
  form: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    public authService: AuthService
    ) {
    this.form = fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.email],
      confirmEmail: ['', Validators.required]
    }, {
      validator: [
        ConfirmedValidator('password', 'confirmPassword'), 
        ConfirmedValidator('email', 'confirmEmail')
      ]
    })
  }

  get registerForm() {
    return this.form.controls;
  }

  submit() {

  }
}