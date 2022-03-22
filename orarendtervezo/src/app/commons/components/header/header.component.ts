import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    setLanguageLocalStorage(language: string){
        localStorage.setItem('Language', language);
        window.location.reload();
    }

    constructor(
    public afAuth: AngularFireAuth, 
    public authService: AuthService, 
    public router: Router){}

    ngOnInit(): void {
        this.isLoggedIn();
    }

    isloggedin = false;

    isLoggedIn() {
        if (localStorage.getItem('user') != 'null') { this.isloggedin = true; }
        else { this.isloggedin = false; }
    }

    logginRoute() {
        this.router.navigate(['user_login']);
    }

    logginOut(){
        this.afAuth.signOut();
        location.reload();
    }
}
