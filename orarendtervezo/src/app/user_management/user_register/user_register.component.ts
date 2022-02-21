import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/shared/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user_register',
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css']
})
export class UserRegisterComponent implements OnInit{
  hide = false;
  confirm_hide = false;
  
  minimumLength = {value: '3'};
  form: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
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

  ngOnInit(): void {
    if(localStorage.getItem('user') != "null") this.router.navigate(['home_page']);
  }

  get registerForm() {
    return this.form.controls;
  }

  submit() {

  }
}