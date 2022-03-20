import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseCrudsService {
    angularfirestoreCollection: AngularFirestoreCollection | undefined;
    items: Observable<any> | undefined;
    userId = this.authService.userData.uid.toString();
    userDoc = this.angularFirestore.collection('users').doc(this.userId);

    constructor(
        private angularFirestore: AngularFirestore,
        private authService: AuthService
    ){}

    public getUserCollection(collection: string, document?: string) {
        document ? this.items = this.userDoc.collection(collection).doc(document).valueChanges()
            : this.items = this.userDoc.collection(collection).valueChanges();
        return this.items;
    }

    public async getUserDocument(collection: string) {
        return this.userDoc.collection(collection).get();
    }

    public putUserCollection(collection: string) {
        if(!this.userDoc.collection(collection))
            this.userDoc.set(collection);
    }

    public putUserDocument(collection: string, documentName: string, data: object) {
        if(this.userDoc.collection(collection)) {
            this.userDoc.collection(collection).doc(documentName).set(data);
        }
    }
}