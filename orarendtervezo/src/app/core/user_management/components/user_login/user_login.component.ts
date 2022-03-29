import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user_login.component.html',
    styleUrls: ['./user_login.component.css']
})
export class UserLoginComponent implements OnInit{
    hide = false;
    confirm_hide = false;

    form: FormGroup = new FormGroup({});

    constructor (
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    ) {
        this.form = fb.group({
            username: ['', [
                Validators.required,
            ]],
            password: ['', [
                Validators.required,
            ]]
        });
    }

    ngOnInit(): void {
        if(localStorage.getItem('user') != 'null') this.router.navigate(['home_page']);
    }

    get loginForm() {
        return this.form.controls;
    }

    public navigateToForgetPassword() {
        this.router.navigateByUrl('user_forgot_password');
    }

    public navigateToRegister() {
        this.router.navigateByUrl('user_register');
    }
}
