import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SocialLoginModule],
})
export class AuthModule {}
