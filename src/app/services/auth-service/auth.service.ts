import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user$!: Observable<User>;

    private loggedInUserSubject = new Subject();
    public loggedInUser$ = this.loggedInUserSubject.asObservable();

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    this.loggedInUserSubject.next(user);
                    return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
                } else {
                    this.loggedInUserSubject.next(null);
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
        return userRef.set(data, { merge: true });
    }

    async googleSignin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        // this.router.navigate(['/home']);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.signOut();
        this.loggedInUserSubject.next(null);
        // this.router.navigate(['/login']);
    }
}
