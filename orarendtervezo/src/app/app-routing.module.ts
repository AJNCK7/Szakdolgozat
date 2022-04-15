import { UserPasswordResetComponent } from './core/user_management/user-password-reset/user-password-reset.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './commons/components/homepage/homepage.component';
import { TimeTableInputComponent } from './core/time_table/components/time-table-input/time-table-input.component';
import { TimeTableResultDisplayComponent } from './core/time_table/components/time-table-result-display/time-table-result-display.component';
import { UserForgotPasswordComponent } from './core/user_management/components/user-forgot-password/user-forgot-password.component';
import { UserLoginComponent } from './core/user_management/components/user_login/user_login.component';
import { UserRegisterComponent } from './core/user_management/components/user_register/user_register.component';
import { UserVerifyEmailComponent } from './core/user_management/components/user_verify_email/user_verify_email.component';

const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'home_page', component: HomepageComponent},
    { path: 'user_login', component: UserLoginComponent},
    { path: 'user_register', component: UserRegisterComponent},
    { path: 'user_password_reset', component: UserPasswordResetComponent},
    { path: 'user_verify_email', component: UserVerifyEmailComponent},
    { path: 'user_forgot_password', component: UserForgotPasswordComponent},
    { path: 'time_table_input', component: TimeTableInputComponent},
    { path: 'time_table_result_display', component: TimeTableResultDisplayComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [HomepageComponent];
