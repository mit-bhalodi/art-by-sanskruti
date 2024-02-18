// import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private accessToken = '';

    private isAuthenticated = new BehaviorSubject(false);

    public isAuthenticated$ = this.isAuthenticated.asObservable();

    private isSuperUser = new BehaviorSubject(false);

    public isSuperUser$ = this.isSuperUser.asObservable();

    public get getAccessToken() {
        return this.accessToken;
    }

    private _userSubject = new BehaviorSubject<any | null>(null);

    public user$ = this._userSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    public registerUser(sendJSON: any) {
        return this.http.post<any>(`${environment.api}/register`, sendJSON).pipe(
            switchMap((response) => {
                return of(response);
            })
        );
    }

    public googleLogin(sendJSON: any) {
        return this.http.post<any>(`${environment.api}/google-auth`, sendJSON, { withCredentials: true }).pipe(
            switchMap((response) => {
                if (response.success === true) {
                    this.isAuthenticated.next(true);
                } else {
                    this.isAuthenticated.next(false);
                }
                this.accessToken = response.token;
                return of(response);
            })
        );
    }

    public loginUser(sendJSON: any) {
        return this.http.post<any>(`${environment.api}/login`, sendJSON, { withCredentials: true }).pipe(
            switchMap((response) => {
                if (response.success === true) {
                    this.isAuthenticated.next(true);
                } else {
                    this.isAuthenticated.next(false);
                }
                this.accessToken = response.token;
                return of(response);
            })
        );
    }

    public logOutUser() {
        return this.http.post<any>(`${environment.api}/logout`, {}, { withCredentials: true }).pipe(
            map((response) => {
                this.isAuthenticated.next(false);
                this.accessToken = '';
                return response;
            })
        );
    }

    public getUser() {
        return this.http.get<any>(`${environment.api}/user`).pipe(
            switchMap((response) => {
                if (response.status === true) {
                    this.isSuperUser.next(true);
                    this.isAuthenticated.next(true);
                } else {
                    this.isAuthenticated.next(false);
                }
                return of(response);
            })
        );
    }

    public getRefreshToken() {
        return this.http.post<any>(`${environment.api}/refresh`, {}, { withCredentials: true }).pipe(
            switchMap((response: any) => {
                this.accessToken = response.token;
                if (response.token) {
                    return of({ 'success': true });
                } else {
                    return of({ 'success': false });
                }
            })
        );
    }
}
