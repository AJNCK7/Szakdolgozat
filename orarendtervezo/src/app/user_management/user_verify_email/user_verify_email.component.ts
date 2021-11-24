import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-user-verify-email',
  templateUrl: './user_verify_email.component.html',
  styleUrls: ['./user_verify_email.component.css']
})
export class UserVerifyEmailComponent{

  constructor(
    public authService: AuthService
  ) { }

}
