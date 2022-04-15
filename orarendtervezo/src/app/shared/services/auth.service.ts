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
            } else {
                localStorage.setItem('user', 'null');
            }
        });
    }

    SignIn(email: any, password: any) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(async (result) => {
                if(result.user?.emailVerified){
                    await(this.SetUserData(result.user));
                    this.ngZone.run(() => {
                        this.router.navigate(['home_page']);
                    });
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
                window.alert(this.translateService.instant('USER.PASSWORD_RESET_SUCCESSFULLY_SEND'));
            })
            .catch(() => {
                window.alert(this.translateService.instant('USER.EMAIL_NOT_EXISTS'));
            });
    }

    isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return (user !== null && user !== 'null' && user.emailVerified !== false) ? true : false;
    }

    AuthLogin(provider: any) {
        return this.afAuth.signInWithPopup(provider)
            .then(async (result) => {
                await(this.SetUserData(result.user));
                this.ngZone.run(() => {
                    this.router.navigate(['home_page']);
                });
                console.log(result);
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
        return this.afAuth.signOut().then(async () => {
            await(localStorage.removeItem('user'));
            location.reload();
        });
    }

    getUserUID() {
        const userUID = JSON.parse(localStorage.getItem('user') || 'null');
        return userUID.uid;
    }

    GoogleAuth() {
        this.AuthLogin(new GoogleAuthProvider());
    }

    checkResetCode(code: string, password: string) {
        this.afAuth.verifyPasswordResetCode(code).then(() => {
            this.afAuth.confirmPasswordReset(code, password).then(() => {
                window.alert(this.translateService.instant('USER.SUCCESSFULL_PASSWORD_CHANGE'));
                this.router.navigate(['user_login']);
            });
        });
    }
}