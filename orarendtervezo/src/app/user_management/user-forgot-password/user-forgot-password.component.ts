import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent {

  form: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    public authService: AuthService
    ) {
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    })
  }

  get forgetPasswordForm() {
    return this.form.controls;
  }
}
