import {Component} from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user_register',
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css']
})
export class UserRegisterComponent {
  hide = false;
  confirm_hide = false;
  
  registerForm = new FormGroup({
    username: new FormControl('', [
                              Validators.required,
                              Validators.minLength(3)
                            ]),
    password: new FormControl('', [
                              Validators.required,
                              Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')
                            ]),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [
                              Validators.required,
                              Validators.email
                              ]),
    confirmEmail: new FormControl('', Validators.required),
  })

  submit() {

  }
}


