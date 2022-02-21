import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user_login.component.html',
  styleUrls: ['./user_login.component.css']
})
export class UserLoginComponent {
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
      ]],
      password: ['', [
        Validators.required,
      ]]
    })
  }

  get loginForm() {
    return this.form.controls;
  }
}
