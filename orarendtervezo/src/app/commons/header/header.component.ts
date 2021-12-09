import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  setLanguageLocalStorage(language: string){
    localStorage.setItem('Language', language)
    window.location.reload();
  }

  constructor(public afAuth: AngularFireAuth){}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isloggedin: boolean = false;

  isLoggedIn() {
    if (localStorage.getItem("user") != null) { this.isloggedin = true; }
    else { this.isloggedin = false; }
  }
}
