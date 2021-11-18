import { Component } from '@angular/core';
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
}
