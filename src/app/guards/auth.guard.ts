import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated$.pipe(
            switchMap((isAuthenticated) => {
                if (!isAuthenticated) {
                    this.router.navigate(['/auth/login']);
                }
                return of(isAuthenticated);
            })
        );
        // return this.authService.user$.pipe(
        //     take(1),
        //     tap((loggedIn) => {
        //         if (!loggedIn) {
        //             this.router.navigate(['/auth/login']);
        //         }
        //     })
        // );
    }
}
