import { FirebaseCrudsService } from './core/time_table/services/firebase-cruds.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './commons/components/footer/footer.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './core/user_management/components/user_login/user_login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';

import { TimeTableInputComponent } from './core/time_table/components/time-table-input/time-table-input.component';
import { AddComponent } from './core/time_table/components/time-table-input/crud-dialogs/add/add.component';
import { EditComponent } from './core/time_table/components/time-table-input/crud-dialogs/edit/edit.component';
import { DeleteComponent } from './core/time_table/components/time-table-input/crud-dialogs/delete/delete.component';
import { DeleteAllComponent } from './core/time_table/components/time-table-input/crud-dialogs/delete-all/delete-all.component';
import { HeaderComponent } from './commons/components/header/header.component';
import { TimeTableResultDisplayDialogComponent } from './core/time_table/components/time-table-result-display-dialog/time-table-result-display-dialog.component';
import { TimeTableResultDisplayComponent } from './core/time_table/components/time-table-result-display/time-table-result-display.component';
import { UserForgotPasswordComponent } from './core/user_management/components/user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './core/user_management/components/user_register/user_register.component';
import { UserVerifyEmailComponent } from './core/user_management/components/user_verify_email/user_verify_email.component';
import { UserPasswordResetComponent } from './core/user_management/user-password-reset/user-password-reset.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MatImports = [
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule,
    MatAutocompleteModule
];

const ComponentImports = [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserVerifyEmailComponent,
    UserForgotPasswordComponent,
    TimeTableInputComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    DeleteAllComponent,
    TimeTableResultDisplayComponent,
    TimeTableResultDisplayDialogComponent,
    UserPasswordResetComponent,

];

const FirebaseImports = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
];

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader{
    return new TranslateHttpLoader(http);
}

const TranslateImports = [
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
];

@NgModule({
    declarations: [
        RoutingComponents,
        ComponentImports,
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
    providers: [AuthService, AngularFirestoreModule, FirebaseCrudsService],
    bootstrap: [AppComponent]
})
export class AppModule { 
}
