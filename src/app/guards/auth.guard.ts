import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(): Observable<boolean> {
        return this.auth.user$.pipe(
            take(1),
            map((user) => !!user),
            tap((loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['/auth/login']);
                }
            })
        );
    }
}
