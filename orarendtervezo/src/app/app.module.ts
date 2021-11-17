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
import { UserRegisterComponent } from './user_management/user_register/user_register.component';
import { UserLoginComponent } from './user_management/user-login/user-login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MatImports: any[] = [
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule
];

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
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    [...TranslateImports],
    [...MatImports],
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
