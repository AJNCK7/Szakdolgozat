import { UserRegisterComponent } from './user_management/user_register/user_register.component';
import { UserLoginComponent } from './user_management/user_login/user_login.component';
import { HomepageComponent } from './commons/homepage/homepage.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home_page', component: HomepageComponent},
  { path: 'user_login', component: UserLoginComponent},
  { path: 'user_register', component: UserRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [HomepageComponent]
