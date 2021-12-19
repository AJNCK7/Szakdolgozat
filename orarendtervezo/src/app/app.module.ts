import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';

import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule} from '@angular/material/menu'
import { MatTableModule} from '@angular/material/table'
import { MatButtonModule} from '@angular/material/button'
import { MatCardModule} from '@angular/material/card'
import { MatCheckboxModule} from '@angular/material/checkbox'
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { UserRegisterComponent } from './user_management/user_register/user_register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './user_management/user_login/user_login.component';

import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { UserVerifyEmailComponent } from './user_management/user_verify_email/user_verify_email.component';
import { UserForgotPasswordComponent } from './user_management/user-forgot-password/user-forgot-password.component';
import { TimeTableInputComponent } from './time_table/time-table-input/time-table-input.component';
import { AddComponent } from './shared/dialog/time-table-datatable/add/add.component';
import { EditComponent } from './shared/dialog/time-table-datatable/edit/edit.component';
import { DeleteComponent } from './shared/dialog/time-table-datatable/delete/delete.component';

const MatImports: any[] = [
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatPaginatorModule
];

const FirebaseImports: any[] = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireModule,
  AngularFireModule,
]

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader{
  return new TranslateHttpLoader(http);
}

const TranslateImports: any[] = [
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RoutingComponents,
    UserRegisterComponent,
    UserLoginComponent,
    UserVerifyEmailComponent,
    UserForgotPasswordComponent,
    TimeTableInputComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    FirebaseImports,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateImports,
    MatImports,
    NgbModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
