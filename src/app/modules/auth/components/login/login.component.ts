import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    // user!: SocialUser;

    constructor(public authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }

    ngOnInit(): void {
        // this.socialAuthService.authState.subscribe((user) => {
        //     this.user = user;
        // });
    }

    login() {
        if (this.loginForm?.valid) {
            this.authService
                .loginUser(this.loginForm?.getRawValue())
                .pipe(take(1))
                .subscribe({
                    next: () => {
                        this.router.navigate(['/home']);
                    },
                    error: (error) => {
                        throwError(() => error);
                    },
                });
        }
    }

    forgotPassword() {
        this.router.navigate(['/auth/forgot']);
    }

    singInWithGoogle() {}
}
