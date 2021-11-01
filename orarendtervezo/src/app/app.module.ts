import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
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
import { MatDialogModule} from '@angular/material/dialog'

const Matimports: any[] = [
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    [...Matimports]
  ],
  providers: [...Matimports],
  bootstrap: [AppComponent]
})
export class AppModule { }
