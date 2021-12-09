import { UserForgotPasswordComponent } from './user_management/user-forgot-password/user-forgot-password.component';
import { UserVerifyEmailComponent } from './user_management/user_verify_email/user_verify_email.component';
import { UserRegisterComponent } from './user_management/user_register/user_register.component';
import { UserLoginComponent } from './user_management/user_login/user_login.component';
import { HomepageComponent } from './commons/homepage/homepage.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user_login', pathMatch: 'full'},
  { path: 'home_page', component: HomepageComponent},
  { path: 'user_login', component: UserLoginComponent},
  { path: 'user_register', component: UserRegisterComponent, canActivate: [AuthGuard]}
  { path: 'user_verify_email', component: UserVerifyEmailComponent},
  { path: 'user_forgot_password', component: UserForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [HomepageComponent]
