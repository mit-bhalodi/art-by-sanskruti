import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    public isAuthenticated$!: Observable<any>;

    public isLoginActive = true;

    public isDataLoading = false;

    constructor(private authService: AuthService, private router: Router) {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
    }

    ngOnInit() {
        this.isDataLoading = true;
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe(() => {
                this.isDataLoading = false;
            });
    }

    public logOut() {
        this.authService.logOutUser().pipe(take(1)).subscribe();
    }

    public changeLocation() {
        this.isLoginActive = !this.isLoginActive;
    }
}
