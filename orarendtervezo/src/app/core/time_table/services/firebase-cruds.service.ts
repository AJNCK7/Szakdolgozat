import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseCrudsService {
    angularfirestoreCollection: AngularFirestoreCollection | undefined;
    items: Observable<unknown> | undefined;
    userDoc;

    constructor(
        private angularFirestore: AngularFirestore,
    ){
        //id nem jó
        this.userDoc = this.angularFirestore.collection('users').doc('oFXbXHwjLAMseR0e2W27C7kJHkI2');
    }

    public getUserCollection(collection: string, document?: string) {
        document ? this.items = this.userDoc.collection(collection).doc(document).valueChanges()
            : this.items = this.userDoc.collection(collection).valueChanges();
        return this.items;
    }

    public async getUserDocument(collection: string) {
        return this.userDoc.collection(collection).get();
    }

    public async putUserCollection(collection: string) {
        this.userDoc.set(collection);
    }

    public async putUserDocument(collection: string, document: string, data: object) {
        this.userDoc.collection(collection).doc(document).set(data);
    }

    public async updateUserDocument(collection: string, document: string, data: object) {
        this.userDoc.collection(collection).doc(document).update(data);
    }

    public async deleteUserDocument(collection: string, document: string) {
        this.userDoc.collection(collection).doc(document).delete();
    }
}