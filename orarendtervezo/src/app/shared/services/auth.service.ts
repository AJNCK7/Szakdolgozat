import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public userData!: any;

    constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private translateService: TranslateService,
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user!;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user') || '{}');
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user') || '{}');
            }
        });
    }

    SignIn(email: any, password: any) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if(result.user?.emailVerified){
                    this.ngZone.run(() => {
                        this.router.navigate(['home_page']);
                    });
                    this.SetUserData(result.user);
                    window.location.reload();
                }
                else {
                    this.afAuth.signOut();
                    window.alert(this.translateService.instant('USER.EMAIL_NOT_VALIDATED'));
                }
            }).catch(() => {
                window.alert(this.translateService.instant('USER.INVALID_EMAIL_OR_PASSWORD'));
            });
    }

    SignUp(email: any, password: any) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.SendVerificationMail();
                this.SignOut();
            }).catch(() => {
                window.alert(this.translateService.instant('USER.EMIAL_ALREADY_EXISTS'));
            });
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u!.sendEmailVerification())
            .then(() => {
                this.router.navigate(['user_verify_email']);
            });
    }

    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.router.navigate(['user_login']);
            }).catch(() => {
                window.alert(this.translateService.instant('USER.EMIAL_NOT_EXISTS'));
            });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    AuthLogin(provider: any) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home_page']);
                });
                this.SetUserData(result.user);
                window.location.reload();
            });
    }

    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['home_page']);
        });
    }

    getUserUID() {
        const userUID = JSON.parse(localStorage.getItem('user') || 'null');
        return userUID.uid;
    }

    GoogleAuth() {
        return this.AuthLogin(new GoogleAuthProvider());
    }
}