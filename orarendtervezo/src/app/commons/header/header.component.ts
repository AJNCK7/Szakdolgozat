import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  setLanguageLocalStorage(language: string){
    localStorage.setItem('Language', language)
    window.location.reload();
  }

  constructor(public afAuth: AngularFireAuth, public authService: AuthService){}
}
