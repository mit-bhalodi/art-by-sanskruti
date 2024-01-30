import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(public auth: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }

    ngOnInit(): void {}
}
