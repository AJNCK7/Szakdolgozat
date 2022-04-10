import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as firestore from 'firebase-admin';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'orarendtervezo';

    constructor(private translate: TranslateService){}
    ngOnInit(): void {
        this.translate.use(localStorage.getItem('Language') || 'hun');
        firestore.firestore().settings({ignoreUndefinedProperties: true});
    }

}
