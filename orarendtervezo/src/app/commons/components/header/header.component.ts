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
    isloggedin = false;

    constructor(
    public afAuth: AngularFireAuth, 
    public authService: AuthService, 
    public router: Router){
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) { this.isloggedin = true; }
        else { this.isloggedin = false; }
    }

    setLanguageLocalStorage(language: string){
        localStorage.setItem('Language', language);
        window.location.reload();
    }

    logginRoute() {
        this.router.navigate(['user_login']);
    }

    logginOut(){
        this.authService.SignOut();
    }
}
