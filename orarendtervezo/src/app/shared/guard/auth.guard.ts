import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(){
    if(!this.authService.isLoggedIn) {
      return true;
    }
    return false;
  }

}