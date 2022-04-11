import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/shared/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-user-password-reset',
    templateUrl: './user-password-reset.component.html',
    styleUrls: ['./user-password-reset.component.css']
})
export class UserPasswordResetComponent {
    hide = false;
    confirm_hide = false;

    minimumLength = {value: '3'};
    form: FormGroup = new FormGroup({});

    constructor (
        private fb: FormBuilder,
        public authService: AuthService,
        private route: ActivatedRoute,
    ) {
        this.form = fb.group({
            password: ['', [
                Validators.required,
                Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')
            ]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: [
                ConfirmedValidator('password', 'confirmPassword'), 
            ]
        });
    }

    get password_resetForm() {
        return this.form.controls;
    }

    checkResetCode() {
        const code = this.route.snapshot.queryParams.oobCode;
        this.authService.checkResetCode(code, this.form.get('password')?.value);
    }

}
