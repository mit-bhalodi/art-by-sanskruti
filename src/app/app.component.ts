import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public user: any;

    private allSubList = new Subscription();

    public isAuthenticated$!: Observable<any>;

    constructor(public authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        // const userSub = this.auth.loggedInUser$.subscribe((user) => {
        //     this.user = user;
        // });
        // this.allSubList.add(userSub);
        this.isAuthenticated$ = this.authService.isAuthenticated$;
    }

    public goToLogin() {
        this.router.navigate(['auth/login']);
    }

    public goToRegister() {
        this.router.navigate(['auth/register']);
    }

    public goToStore() {
        this.router.navigate(['/store']);
    }

    public goToHome() {
        this.router.navigate(['/home']);
    }

    public logOut() {
        this.authService
            .logOutUser()
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigate(['/auth/login']);
            });
    }

    public scroll(el: HTMLElement) {
        el.scrollIntoView();
    }

    ngOnDestroy(): void {
        this.allSubList.unsubscribe();
    }
}
