import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user$: Observable<User>;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    private updateUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
        if (user) {
            this.router.navigate(['/home']);
        }
        return userRef.set(data, { merge: true });
    }

    async googleSignin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        this.router.navigate(['/home']);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.signOut();
        this.router.navigate(['/login']);
    }
}
